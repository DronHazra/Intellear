import React from 'react';
import { Button } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import StopIcon from '@material-ui/icons/Stop';

export default function RecordButton(props) {
	return (
		<Button
			{...props}
			startIcon={
				props.recording ? <StopIcon /> : <FiberManualRecordIcon />
			}
			variant={props.recording ? 'contained' : 'outlined'}
			disabled={props.permission}
			onClick={props.onClick()}
		>
			Record
		</Button>
	);
}
