import React from 'react';
import { Card, Fade, CardContent, Grid, Typography } from '@material-ui/core';

export default function TextCard(props) {
	let { score, ...fadeProps } = props;
	return (
		<Fade {...fadeProps}>
			<Card elevation={3}>
				<CardContent>
					<Grid container direction='column' alignItems='center'>
						<Grid item>
							{/* <div className='staffArea'></div> */}
						</Grid>
					</Grid>
					<Typography align='justify'>
						Welcome to Intellear! To start, click{' '}
						<strong>Generate</strong> and <strong>Listen</strong> to
						the AI-Generated sample! Once you're ready,{' '}
						<strong>Record</strong> yourself playing the sample
						back, and click <strong>Score</strong> to get graded!
					</Typography>
					<Typography align='justify'>
						NOTE: Some AI samples might be a little difficult. You
						can try slowing down the tempo, or reducing the
						temperature and re-generating.
					</Typography>
				</CardContent>
			</Card>
		</Fade>
	);
}
