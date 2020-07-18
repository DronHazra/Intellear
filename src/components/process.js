import React, { useContext } from 'react';
import { Stepper, StepLabel, Step, makeStyles, Fade } from '@material-ui/core';
import { AppContext } from '../App';
function getSteps() {
	return [
		'Generate w/ MusicVAE',
		'Listen',
		'Record yourself',
		'Listen to recording',
		'Get a score!',
	];
}

const useStyles = makeStyles((theme) => {
	return {
		root: {
			borderRadius: '3rem',
		},
	};
});

export default function Process(props) {
	const steps = getSteps();
	const step = useContext(AppContext);
	const classes = useStyles();
	return (
		<Fade {...props}>
			<Stepper
				activeStep={step.step}
				square={false}
				variant='outlined'
				className={classes.root}
			>
				{steps.map((label) => {
					return (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
		</Fade>
	);
}
