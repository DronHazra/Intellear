import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import StopIcon from '@material-ui/icons/Stop';
import Typography from '@material-ui/core/Typography';
import PlayButtton from './play_button';
import PlayRecordingButton from './play_recording_button';
import { ReactMic } from 'react-mic';
import { makeStyles } from '@material-ui/styles';
import TranscribeButton from './transcribe_button';
import { Fade } from '@material-ui/core';
import notes from '../notes';

const useStyles = makeStyles({
	root: {
		width: 0,
	},
});

export default function RecordPlayTranscribe(props) {
	const classes = useStyles();
	//const [permission, setPermission] = useState(false);
	const [audioURL, setAudioURL] = useState('');
	const [recording, setRecord] = useState(false);
	const toggleRecord = () => {
		if (recording) {
			console.log(recording);
			setRecord(false);
		} else {
			setRecord(true);
		}
	};
	/*useEffect(() => {
		if (navigator.mediaDevices) {
			navigator.mediaDevices
				.getUserMedia({ audio: true })
				.then(setPermission(true))
				.catch(setPermission(false));
		}
	}, []);*/

	const handleStop = (recordedBlob) => {
		setAudioURL(URL.createObjectURL(recordedBlob.blob));
	};
	return (
		<Grid container direction='row' alignItems='center' justify='center'>
			<Grid item xs={12}>
				<Fade
					in={true}
					timeout={props.timeout}
					style={{ transitionDelay: props.delay }}
				>
					<ButtonGroup
						color='primary'
						variant='outlined'
						fullWidth
						disableElevation
					>
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
							sequenceCallback={props.callback}
						/>
					</ButtonGroup>
				</Fade>
			</Grid>
			<Grid item>
				<Fade
					in={props.sequence ? true : false}
					timeout={props.timeout}
				>
					<Typography align='left'>
						<strong>First note: </strong>

						{props.sequence
							? notes[props.sequence.notes[0].pitch]
							: ''}
					</Typography>
				</Fade>
			</Grid>
			<Grid item xs='auto'>
				<ReactMic
					record={recording}
					onStop={handleStop}
					channelCount={1}
					className={classes.root}
					strokeColor={'#00e5ff'}
					backgroundColor={'#fafafa'}
					echoCancellation
					autoGainControl
					noiseSuppression
				/>
			</Grid>
		</Grid>
	);
}
