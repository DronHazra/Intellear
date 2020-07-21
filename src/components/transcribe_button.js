import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { OnsetsAndFrames } from '@magenta/music/node/transcription';
import { AppContext } from '../App';
import { StaffSVGVisualizer, sequences } from '@magenta/music/node/core';
import tap from '../sounds/ui_tap.wav';
const tapAudio = new Audio(tap);
export default function TranscribeButton(props) {
	const model = new OnsetsAndFrames(
		'https://storage.googleapis.com/magentadata/js/checkpoints/transcription/onsets_frames_uni'
	);
	const step = useContext(AppContext);
	const mobile = step.mobile;

	const { url, sequence, sequenceCallback, ...others } = props;
	const handleClick = async () => {
		tapAudio.play();
		console.log('in effect');
		if (model) {
			console.log('in transcription');
			if (!model.isInitialized()) {
				await model.initialize();
			}
			let transcribedSequence = await model.transcribeFromAudioURL(url);
			transcribedSequence = sequences.quantizeNoteSequence(
				transcribedSequence,
				4
			);
			console.log('transcription complete');
			step.changeStep(0);
			let score = 100;
			console.log('in scoring');
			const userSequence = transcribedSequence.notes;
			sequence.notes.forEach((note, index) => {
				try {
					if (note.pitch !== userSequence[index].pitch) {
						score *= 0.9;
					}
				} catch (err) {
					score *= 0.9;
				}
			});
			score = Math.round(score);
			sequenceCallback(score);
			console.log('visualizing');
			const visualizer = new StaffSVGVisualizer(
				sequence,
				document.getElementsByClassName('staffArea')[0],
				{ noteRGB: [33, 33, 33] }
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
