import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

export default function GenerateButton(props) {
	const [text, setText] = useState('Generate!');
	const [disabled, disable] = useState(true);
	const [generating, setGen] = useState(false);
	const generate = async () => {
		if (!props.disabled) {
			disable(true);
			setText('Generating...');
			await props.callback();
			disable(false);
			setText('Generate!');
		}
	};

	const handleClick = () => {
		generate();
	};

	return (
		<Grid container direction='column' alignItems='center'>
			<Button
				variant='contained'
				color='primary'
				onClick={handleClick}
				disabled={props.disabled && disabled}
				size='large'
			>
				{text}
			</Button>
		</Grid>
	);
}
