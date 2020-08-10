import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { AppContext } from '../App';
import * as mm from '@magenta/music/es6';
import tap from '../sounds/ui_tap.wav';
const tapAudio = new Audio(tap);
export default function TranscribeButton(props) {
	const model = new mm.OnsetsAndFrames(
		'https://storage.googleapis.com/magentadata/js/checkpoints/transcription/onsets_frames_uni'
	);
	const step = useContext(AppContext);
	const mobile = step.mobile;

	const { url, sequence, scoreCallback, ...others } = props;

	const handleClick = async () => {
		tapAudio.play();
		console.log('in effect');
		// this is really complicated...
		if (model) {
			// this only runs if the model loaded properly
			console.log('in transcription');

			if (!model.isInitialized()) {
				await model.initialize();
			}

			let transcribedSequence = await model.transcribeFromAudioURL(url);
			transcribedSequence = mm.sequences.quantizeNoteSequence(
				transcribedSequence,
				4
			);
			step.changeStep(0);
			console.log('transcription complete');

			// this is the scoring process
			let score = 100;
			const userSequence = transcribedSequence.notes;
			sequence.notes.forEach((note, index) => {
				try {
					if (note.pitch !== userSequence[index].pitch) {
						// if the note doesn't match, reduce the score
						score *= 0.9;
					}
				} catch (err) {
					// if there's a rest, it ends up throwing an error. catch it and reduce the score
					score *= 0.9;
				}
			});
			score = Math.round(score);
			scoreCallback(score);

			console.log('visualizing');
			const visualizer = new mm.StaffSVGVisualizer(
				sequence,
				document.getElementsByClassName('staffArea')[0],
				{ noteRGB: [0, 0, 0] }
			);
			visualizer.redraw();
		}
	};
	return (
		<Button
			{...others}
			startIcon={<CreateIcon />}
			onClick={handleClick}
			disabled={step.step !== 4}
		>
			{mobile ? '' : 'Score'}
		</Button>
	);
}
