import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import StopIcon from '@material-ui/icons/Stop';
import PlayButtton from './play_button';
import PlayRecordingButton from './play_recording_button';
import { ReactMic } from 'react-mic';
import { makeStyles } from '@material-ui/styles';
import TranscribeButton from './transcribe_button';
import { Fade } from '@material-ui/core';

const useStyles = makeStyles({
	root: {
		width: 200,
		padding: '5px',
	},
});

export default function RecordPlayTranscribe(props) {
	const classes = useStyles();
	const [permission, setPermission] = useState(false);
	const [audioURL, setAudioURL] = useState('');
	const [recording, setRecord] = useState(false);
	const [loadIn, setLoadIn] = useState(false);
	useEffect(() => {
		const timer = setTimeout(() => setLoadIn(true), 800);
	});
	const toggleRecord = () => {
		if (recording) {
			console.log(recording);
			setRecord(false);
		} else {
			setRecord(true);
		}
	};
	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({ audio: true })
			.then(setPermission(true))
			.catch(setPermission(false));
	}, []);

	const handleStop = (recordedBlob) => {
		setAudioURL(URL.createObjectURL(recordedBlob.blob));
	};
	return (
		<Grid container direction='row' alignItems='center'>
			<Grid item xs={9} container direction='column' alignItems='center'>
				<Fade in={loadIn} timeout={props.timeout}>
					<ButtonGroup color='secondary'>
						<PlayButtton
							sequence={props.sequence}
							disabled={props.sequence ? false : true}
							tempo={props.tempo}
						/>
						<Button
							startIcon={
								recording ? (
									<StopIcon />
								) : (
									<FiberManualRecordIcon />
								)
							}
							variant={recording ? 'contained' : 'outlined'}
							disabled={!permission}
							onClick={toggleRecord}
						>
							Record
						</Button>
						<PlayRecordingButton
							url={audioURL}
							disabled={audioURL ? false : true}
						/>
						<TranscribeButton
							url={audioURL}
							sequence={props.sequence}
							callback={props.callback}
						/>
					</ButtonGroup>
				</Fade>
			</Grid>
			<Grid item xs={3}>
				<Fade in={loadIn} timeout={props.timeout}>
					<ReactMic
						record={recording}
						onStop={handleStop}
						channelCount={1}
						className={classes.root}
						strokeColor={'#f069aa'}
						backgroundColor={'#303030'}
						echoCancellation
						autoGainControl
						noiseSuppression
					/>
				</Fade>
			</Grid>
		</Grid>
	);
}
