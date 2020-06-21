import React, { useContext } from 'react';
import { Stepper, StepLabel, Step } from '@material-ui/core';
import { StepContext } from '../App';
function getSteps() {
	return [
		'Generate w/ MusicVAE',
		'Listen',
		'Record yourself',
		'Get a score!',
	];
}

export default function Process(props) {
	const steps = getSteps();
	const step = useContext(StepContext);

	return (
		<Stepper activeStep={step.step}>
			{steps.map((label, index) => {
				const stepProps = {};
				const labelProps = {};
				return (
					<Step key={label} {...stepProps}>
						<StepLabel {...labelProps}>{label}</StepLabel>
					</Step>
				);
			})}
		</Stepper>
	);
}
