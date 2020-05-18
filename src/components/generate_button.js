import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

export default function GenerateButton(props) {
	const [text, setText] = useState('Generate!');
	const [disabled, disable] = useState(true);
	const generate = async () => {
		if (!props.disabled) {
			disable(true);
			setText('Generating...');
			await props.callback();
			disable(false);
			setText('Generate!');
		}
	};

	return (
		<Button
			variant='contained'
			color='primary'
			onClick={generate}
			disabled={props.disabled && disabled}
			size='large'
		>
			{text}
		</Button>
	);
}
