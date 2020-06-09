import React, { useState, useEffect } from 'react';
import Slider from '@material-ui/core/Slider';
import { Typography, Grid, Fade } from '@material-ui/core';

export default function TemperatureSlider(props) {
	const [temperature, setTemp] = useState(props.defaultValue);
	const [value, setValue] = useState((temperature - 0.5) * 40);
	const [loadIn, setLoadIn] = useState(false);
	const handleChange = (e, newValue) => {
		setValue(newValue);
		setTemp(value / 40 + 0.5);
		props.callback(temperature);
	};

	useEffect(() => {
		const timer = setTimeout(() => setLoadIn(true), 650);
	});
	return (
		<Grid container direction='row' justify='flex-end' spacing={1}>
			<Grid item xs={4}>
				<Fade in={loadIn} timeout={props.timeout}>
					<Typography align='right'>Temperature</Typography>
				</Fade>
			</Grid>
			<Grid item xs={8}>
				<Fade in={loadIn} timeout={props.timeout}>
					<Slider
						value={value}
						onChange={handleChange}
						aria-labelledby='continous-slider'
						valueLabelDisplay='auto'
					/>
				</Fade>
			</Grid>
		</Grid>
	);
}
