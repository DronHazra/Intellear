import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';
import { Typography, Grid } from '@material-ui/core';

export default function TemperatureSlider(props) {
	const [temperature, setTemp] = useState(props.defaultValue);
	const [value, setValue] = useState((temperature - 0.5) * 40);

	const handleChange = (e, newValue) => {
		setValue(newValue);
		setTemp(value / 40 + 0.5);
		props.callback(temperature);
	};

	return (
		<Grid container direction='row' justify='flex-end' spacing={1}>
			<Grid item xs={4}>
				<Typography align='right'>Temperature</Typography>
			</Grid>
			<Grid item xs={8}>
				<Slider
					value={value}
					onChange={handleChange}
					aria-labelledby='continous-slider'
					valueLabelDisplay='auto'
				/>
			</Grid>
		</Grid>
	);
}
