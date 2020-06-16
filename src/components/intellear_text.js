import React from 'react';
import { Card, Fade, CardContent, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
	return {
		root: {
			padding: theme.spacing(1),
		},
		buttonInline: {
			color: theme.palette.secondary.main,
		},
	};
});

export default function TextCard(props) {
	let { score, ...fadeProps } = props;
	const classes = useStyles();
	return (
		<Fade {...fadeProps}>
			<Card className={classes.root}>
				<CardContent>
					<Grid container direction='column' justify='center'>
						<Grid item>
							<div className='staffArea'></div>
						</Grid>
					</Grid>
					<Typography paragraph>
						Welcome to Intellear! To start, click{' '}
						{<span className={classes.buttonInline}>Generate</span>}{' '}
						and{' '}
						{<span className={classes.buttonInline}>Listen</span>}{' '}
						to the AI-Generated sample! Once you're ready,{' '}
						{<span className={classes.buttonInline}>Record </span>}
						yourself playing the sample back, and click{' '}
						{<span className={classes.buttonInline}>Score</span>} to
						get graded!
					</Typography>
					<Typography paragraph>
						NOTE: Some AI samples might be a little difficult. You
						can try slowing down the tempo, or reducing the
						temperature and re-generating.
					</Typography>
					<Grid container direction='column' alignContent='center'>
						<Grid item xs={12}>
							<iframe
								className={classes.video}
								title='intellear-vid'
								width='560'
								height='315'
								src='https://www.youtube-nocookie.com/embed/wnxTqxL7pBQ'
								frameBorder='0'
								allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
								allowFullScreen
							/>
						</Grid>
					</Grid>
					{score ? (
						<Typography paragraph className={classes.scoreText}>
							`Your score is: ${score}%!`
						</Typography>
					) : (
						''
					)}
				</CardContent>
			</Card>
		</Fade>
	);
}
