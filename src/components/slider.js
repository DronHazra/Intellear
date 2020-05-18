import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';

export default function TemperatureSlider(props) {
	const [temperature, setTemp] = useState(props.defaultValue);
	const [value, setValue] = useState((temperature - 0.5) * 40);

	const handleChange = (e, newValue) => {
		setValue(newValue);
		setTemp(value / 40 + 0.5);
		props.callback(temperature);
	};

	return (
		<Slider
			value={value}
			onChange={handleChange}
			aria-labelledby='continous-slider'
			valueLabelDisplay='on'
		/>
	);
}
