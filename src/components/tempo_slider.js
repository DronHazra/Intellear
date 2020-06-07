import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';
import { Typography, Grid } from '@material-ui/core';

export default function TempoSlider(props) {
	const [value, setValue] = useState(120);

	const handleChange = (e, newValue) => {
		setValue(newValue);
		props.callback(value);
	};

	return (
		<Grid container direction='row' justify='flex-end' spacing={1}>
			<Grid item xs={4}>
				<Typography align='right'>Tempo</Typography>
			</Grid>
			<Grid item xs={8}>
				<Slider
					value={value}
					onChange={handleChange}
					aria-labelledby='continous-slider'
					valueLabelDisplay='auto'
					min={60}
					max={150}
					color='secondary'
				/>
			</Grid>
		</Grid>
	);
}
