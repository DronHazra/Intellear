import React, { useState, useEffect, useContext } from 'react';
import { Button } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { OnsetsAndFrames } from '@magenta/music/node/transcription';
import { StepContext } from '../App';
import { StaffSVGVisualizer, sequences } from '@magenta/music/node/core';

export default function TranscribeButton(props) {
	const [model, setModel] = useState(null);
	const [noteSequence, setSequence] = useState(null);
	const step = useContext(StepContext);
	useEffect(() => {
		async function loadModel() {
			const model = new OnsetsAndFrames(
				'https://storage.googleapis.com/magentadata/js/checkpoints/transcription/onsets_frames_uni'
			);
			await model.initialize();
			console.log('model initialized');
			setModel(model);
		}
		loadModel();
	}, []);

	const { url, sequence, sequenceCallback, ...others } = props;
	useEffect(() => {
		let score = 100;
		if (sequence && noteSequence) {
			const userSequence = noteSequence.notes;
			sequence.notes.forEach((note, index) => {
				try {
					if (note.pitch !== userSequence[index].pitch) {
						score *= 0.9;
					}
				} catch (err) {
					score *= 0.9;
				}
			});
			console.log('in scoring');
			score = Math.round(score);
			sequenceCallback(score);
		}
	}, [noteSequence, sequence, sequenceCallback]);

	const handleClick = () => {
		console.log('in effect');
		if (model) {
			console.log('in transcription');
			const transcribe = async () => {
				if (url) {
					let noteSeq = await model.transcribeFromAudioURL(url);
					noteSeq = sequences.quantizeNoteSequence(noteSeq, 4);
					setSequence(noteSeq);
					console.log('transcription complete');
					step.changeStep(0);
				}
			};
			if (!model.isInitialized()) {
				model
					.initialize()
					.then(transcribe)
					.then(() => {
						model.dispose();
					});
			} else {
				transcribe().then(() => {
					model.dispose();
				});
			}
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
			disabled={!(step.step === 3)}
		>
			Score
		</Button>
	);
}
