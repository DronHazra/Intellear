import React, { useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import StopIcon from '@material-ui/icons/Stop';
import Typography from '@material-ui/core/Typography';
import PlayButtton from './play_button';
import { AppContext } from '../App';
import PlayRecordingButton from './play_recording_button';
import { ReactMic } from 'react-mic';
import { makeStyles } from '@material-ui/styles';
import TranscribeButton from './transcribe_button';
import { Fade, Snackbar } from '@material-ui/core';
import notes from '../notes';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles({
	root: {
		width: 0,
	},
});

export default function RecordPlayTranscribe(props) {
	const classes = useStyles();
	//const [permission, setPermission] = useState(false);
	const [audioURL, setAudioURL] = useState('');
	const [open, setOpen] = useState(false);
	const [recording, setRecord] = useState(false);
	const step = useContext(AppContext);

	const toggleRecord = () => {
		if (step.recordingBroken) {
			setOpen(true);
		} else {
			if (recording) {
				console.log(recording);
				setRecord(false);
				step.changeStep(3);
			} else {
				setRecord(true);
			}
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
		<>
			<Grid
				container
				direction='row'
				alignItems='center'
				justify='center'
			>
				<Grid item xs={12}>
					<Fade
						in={true}
						timeout={props.timeout}
						style={{ transitionDelay: props.delay }}
					>
						<ButtonGroup
							color='secondary'
							variant='contained'
							fullWidth
							disableElevation
						>
							<PlayButtton
								sequence={props.sequence}
								disabled={step.step !== 1 && step.step !== 2}
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
								disabled={step.step !== 2}
							>
								Record
							</Button>
							<PlayRecordingButton
								url={audioURL}
								disabled={step.step < 3}
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
						noiseSuppression
					/>
				</Grid>
			</Grid>
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				open={open}
				onClose={() => setOpen(false)}
			>
				<Alert
					variant='filled'
					onClose={() => setOpen(false)}
					severity='error'
				>
					Uh oh, something went wrong:(. We couldn't get recording to
					work on your device. Sorry ;-;
				</Alert>
			</Snackbar>
		</>
	);
}
