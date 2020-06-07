import React, { useState, useEffect } from 'react';
import TemperatureSlider from './components/slider';
import TempoSlider from './components/tempo_slider';
import Grid from '@material-ui/core/Grid';
import RecordPlayTranscribe from './components/RecordPlayTranscribe';
import { MusicVAE } from '@magenta/music/node/music_vae';
import Header from './components/Header';
import green from '@material-ui/core/colors/green';
import {
	createMuiTheme,
	MuiThemeProvider,
	CssBaseline,
	Paper,
	Typography,
	makeStyles,
	Button,
	Fade,
	CircularProgress,
	Snackbar,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { Alert, AlertTitle } from '@material-ui/lab';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { sequences } from '@magenta/music/node/core';
import notes from './notes';
const theme = createMuiTheme({
	palette: {
		primary: {
			main: green['A200'],
		},
		secondary: {
			main: '#f069aa',
		},
		type: 'dark',
	},
});
const useStyles = makeStyles({
	root: {
		margin: 6,
	},
	scoreText: {
		paddingTop: 2,
	},
});
export default function App() {
	const [value, setVal] = useState(1.0);
	const url =
		'https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_4bar_med_lokl_q2';
	const [vaeDisabled, disableVAE] = useState(true);
	const [musicvae, setVAE] = useState('');
	const [score, setScore] = useState(null);
	const [tempo, setTempo] = useState(120);
	const [genComplete, setGenComplete] = useState(false);
	const classes = useStyles();

	const scoreCallback = (n) => setScore(n);

	useEffect(() => {
		async function loadModel() {
			disableVAE(true);
			const model = new MusicVAE(url);
			await model.initialize();
			setVAE(model);
			disableVAE(false);
		}
		loadModel();
	}, []);
	const [currentSample, newSample] = useState(null);

	const generate = () => {
		setGenComplete(true);
		musicvae
			.sample(1, value)
			.then((sample) =>
				newSample(sequences.mergeConsecutiveNotes(sample[0]))
			);
	};
	const handleClose = () => {
		setGenComplete(false);
	};
	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<Grid container direction='column' spacing={4}>
				<Grid item>
					<Header />
				</Grid>
				<Grid
					item
					container
					direction='row'
					alignItems='center'
					justify='space-evenly'
					spacing={2}
				>
					<Grid
						item
						xs={3}
						container
						direction='column'
						spacing={1}
						alignItems='flex-start'
					>
						<TempoSlider callback={setTempo} />
						<TemperatureSlider
							defaultValue={value}
							callback={setVal}
						/>
					</Grid>
					<Grid item>
						<Button
							variant='contained'
							color='primary'
							onClick={generate}
							disabled={vaeDisabled}
							size='large'
						>
							Generate!
						</Button>
					</Grid>
					<Grid item>
						<Typography align='left'>
							First note:{' '}
							{currentSample
								? notes[currentSample.notes[0].pitch]
								: ''}
						</Typography>
					</Grid>
					<Grid item>
						<RecordPlayTranscribe
							sequence={currentSample}
							callback={scoreCallback}
							tempo={tempo}
						/>
					</Grid>
				</Grid>
				<Grid
					item
					container
					direction='row'
					alignItems='center'
					justify='center'
				>
					<Grid item xs={8}>
						<Card className={classes.root} elevation={5}>
							<CardContent>
								<div className='staffArea'></div>
								<Typography
									paragraph
									className={classes.scoreText}
								>
									Your score is: {score}!
								</Typography>
								<Typography
									paragraph
									className={classes.mainText}
								>
									Welcome to Intellear! To start, click{' '}
									{<span>Generate</span>} and{' '}
									{<span>Listen</span>} to the AI-Generated
									sample! Once you're ready, record yourself
									playing the sample back, and click{' '}
									{<span>Score</span>} to get graded!
								</Typography>
								<Typography
									paragraph
									className={classes.mainText}
								>
									NOTE: Some AI samples might be a little
									difficult. You can try slowing down the
									tempo, or reducing the temperature and
									re-generating.
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Grid>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				open={genComplete}
				onClose={handleClose}
				autoHideDuration={6000}
			>
				<Alert onClose={handleClose} severity='success'>
					<AlertTitle>Success</AlertTitle>
					We're done generating — <strong>get ear training!</strong>!
				</Alert>
			</Snackbar>
		</MuiThemeProvider>
	);
}
