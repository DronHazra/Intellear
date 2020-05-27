import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import StopIcon from '@material-ui/icons/Stop';
import PlayButtton from './play_button';
import RecordButton from './record_button';
import PlayRecordingButton from './play_recording_button';
import { ReactMic } from 'react-mic';

export default function RecordPlayTranscribe(props) {
	const [permission, setPermission] = useState(false);
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
	useEffect(() => {
		navigator.getUserMedia(
			{ audio: true },
			() => setPermission(true),
			() => {
				setPermission(false);
			}
		);
	}, []);
	const handleStop = (recordedBlob) => {
		setAudioURL(URL.createObjectURL(recordedBlob.blob));
	};
	return (
		<Grid container direction='column' alignItems='center'>
			<Grid item>
				<ReactMic
					record={recording}
					onStop={handleStop}
					channelCount={1}
				/>
			</Grid>
			<Grid item xs={12}>
				<ButtonGroup color='secondary'>
					<PlayButtton
						sequence={props.sequence}
						disabled={props.sequence ? false : true}
					/>
					<Button
						startIcon={
							recording ? <StopIcon /> : <FiberManualRecordIcon />
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
					<Button disabled={true}>Transcribe</Button>
				</ButtonGroup>
			</Grid>
		</Grid>
	);
}
