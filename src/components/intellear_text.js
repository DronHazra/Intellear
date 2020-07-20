import React from 'react';
import {
	Card,
	Fade,
	CardContent,
	Typography,
	makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(theme => {
	return {
		root: {
			background: theme.palette.background.paper,
		},
	};
});
export default function TextCard(props) {
	let { score, ...fadeProps } = props;
	const classes = useStyles();
	return (
		<Fade {...fadeProps}>
			<Card elevation={3} className={classes.root}>
				<CardContent>
					<Typography align='justify'>
						Welcome to Intellear! To start, click{' '}
						<strong>Generate</strong> and <strong>Listen</strong> to
						the AI-Generated melody! Once you're ready,{' '}
						<strong>Record</strong> yourself playing it back, and
						click <strong>Score</strong> to get graded! Your robots
						will be working hard, so your browser might become
						sluggish. Good luck!
					</Typography>
				</CardContent>
			</Card>
		</Fade>
	);
}
