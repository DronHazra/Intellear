import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { OnsetsAndFrames } from '@magenta/music/node/transcription';
import {
	StaffSVGVisualizer,
	StaffSVGVisualizerConfig,
	sequences,
} from '@magenta/music/node/core';

export default function TranscribeButton(props) {
	const [model, setModel] = useState(null);
	const [transcribing, toggleTranscribe] = useState(false);
	const [noteSequence, setSequence] = useState(null);
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

	const { url, sequence, callback } = props;
	useEffect(() => {
		let score = 100;
		if (sequence && noteSequence) {
			const userSequence = noteSequence.notes;
			sequence.notes.forEach((note, index) => {
				console.log(note);
				try {
					if (note.pitch !== userSequence[index].pitch) {
						score *= 0.9;
					}
				} catch (err) {
					score *= 0.9;
				}
			});
		}
		console.log('in scoring');
		score = Math.round(score);
		callback(score);
		//document.getElementsByClassName('score').innerHTML =
		//'FFFFFFFFFFFFFFFFFFF';
	}, [noteSequence, sequence]);

	useEffect(() => {
		if (noteSequence) {
			const visualizer = new StaffSVGVisualizer(
				sequence,
				document.getElementsByClassName(
					'staffArea'
				)[0] /*,
				{ noteRGB: '#fff' }*/
			);
			visualizer.redraw();
		}
	}, [noteSequence]);

	const handleClick = () => {
		console.log('in effect');
		if (model && !transcribing) {
			toggleTranscribe(true);
			console.log('in transcription');
			const transcribe = async () => {
				if (url) {
					let noteSeq = await model.transcribeFromAudioURL(url);
					noteSeq = sequences.quantizeNoteSequence(noteSeq, 4);
					console.log(noteSeq);
					setSequence(noteSeq);
					console.log('transcription complete');
				}
			};
			if (!model.isInitialized()) {
				model
					.initialize()
					.then(transcribe)
					.then(() => {
						model.dispose();
						toggleTranscribe(false);
					});
			} else {
				transcribe().then(() => {
					model.dispose();
					toggleTranscribe(false);
				});
			}
		}
	};
	return (
		<Button
			{...props}
			startIcon={<CreateIcon />}
			onClick={handleClick}
			variant={transcribing ? 'contained' : 'outlined'}
		>
			Score
		</Button>
	);
}
