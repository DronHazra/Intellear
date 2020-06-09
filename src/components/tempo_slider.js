import React, { useState, useEffect } from 'react';
import Slider from '@material-ui/core/Slider';
import { Typography, Grid, Fade } from '@material-ui/core';

export default function TempoSlider(props) {
	const [value, setValue] = useState(120);
	const [loadIn, setLoadIn] = useState(false);

	const handleChange = (e, newValue) => {
		setValue(newValue);
		props.callback(value);
	};

	useEffect(() => {
		const timer = setTimeout(() => setLoadIn(true), 500);
	});
	return (
		<Grid container direction='row' justify='flex-end' spacing={1}>
			<Grid item xs={4}>
				<Fade in={loadIn} timeout={props.timeout}>
					<Typography align='right'>Tempo</Typography>
				</Fade>
			</Grid>
			<Grid item xs={8}>
				<Fade in={loadIn} timeout={props.timeout}>
					<Slider
						value={value}
						onChange={handleChange}
						aria-labelledby='continous-slider'
						valueLabelDisplay='auto'
						min={60}
						max={150}
						color='secondary'
					/>
				</Fade>
			</Grid>
		</Grid>
	);
}
