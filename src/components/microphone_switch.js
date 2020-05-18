import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function MicrophoneSwitch(props) {
	const [state, setState] = React.useState(false);

	const handleChange = (event) => {
		setState(event.target.checked);
		props.callback(state);
	};

	return (
		<FormGroup row>
			<FormControlLabel
				control={<Switch checked={state} onChange={handleChange} />}
				label='Microphone'
			/>
		</FormGroup>
	);
}
