import React, { useContext } from 'react';
import { Stepper, StepLabel, Step, makeStyles, Fade } from '@material-ui/core';
import { StepContext } from '../App';
function getSteps() {
	return [
		'Generate w/ MusicVAE',
		'Listen',
		'Record yourself',
		'Get a score!',
	];
}

const useStyles = makeStyles((theme) => {
	return {
		root: {
			borderRadius: '3rem',
			marginBottom: theme.spacing(10),
		},
	};
});

export default function Process(props) {
	const steps = getSteps();
	const step = useContext(StepContext);
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
