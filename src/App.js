import React, { useState, useEffect } from 'react';
import RecordPlayTranscribe from './components/RecordPlayTranscribe';
import TemperatureSlider from './components/slider';
import TempoSlider from './components/tempo_slider';
import Header from './components/Header';
import notes from './notes';
import {
	createMuiTheme,
	ThemeProvider,
	makeStyles,
} from '@material-ui/core/styles';
import {
	Grid,
	CssBaseline,
	Typography,
	Button,
	Snackbar,
	Card,
	CardContent,
	Fade,
	Backdrop,
	CircularProgress,
} from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import { Alert, AlertTitle } from '@material-ui/lab';
import { MusicVAE } from '@magenta/music/node/music_vae';
import { sequences } from '@magenta/music/node/core';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: green['A200'],
		},
		secondary: {
			main: '#f558a4',
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
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
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
	const [ios] = useState(
		navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)
	);
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
		if (!ios) {
			loadModel();
		}
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
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Backdrop
				open={vaeDisabled}
				className={classes.backdrop}
				timeout={500}
			>
				<Grid
					container
					direction='column'
					justify='center'
					alignItems='center'
				>
					<Grid item>
						<CircularProgress color='secondary' />
					</Grid>
					<Grid item>
						<Typography>
							{ios
								? 'Sorry, Intellear does not work on Safari. Please use another browser'
								: 'doing things...'}
						</Typography>
					</Grid>
				</Grid>
			</Backdrop>
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
						<TempoSlider callback={setTempo} timeout={500} />
						<TemperatureSlider
							defaultValue={value}
							callback={setVal}
							timeout={500}
						/>
					</Grid>
					<Grid item>
						<Fade in={!vaeDisabled} timeout={500}>
							<Button
								variant='contained'
								color='primary'
								onClick={generate}
								disabled={vaeDisabled}
								size='large'
							>
								Generate!
							</Button>
						</Fade>
					</Grid>
					<Grid item>
						<Fade in={!vaeDisabled} timeout={500}>
							<Typography align='left'>
								First note:{' '}
								{currentSample
									? notes[currentSample.notes[0].pitch]
									: ''}
							</Typography>
						</Fade>
					</Grid>
					<Grid item>
						<RecordPlayTranscribe
							sequence={currentSample}
							callback={scoreCallback}
							tempo={tempo}
							in={!vaeDisabled}
							timeout={500}
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
					<Grid item xs={8} spacing={1}>
						<Fade in={!vaeDisabled} timeout={500}>
							<Card
								className={classes.root}
								elevation={5}
								alignItems='center'
							>
								<CardContent>
									<div className='staffArea'></div>
									<Typography
										paragraph
										className={classes.mainText}
									>
										Welcome to Intellear! To start, click{' '}
										{<span>Generate</span>} and{' '}
										{<span>Listen</span>} to the
										AI-Generated sample! Once you're ready,
										record yourself playing the sample back,
										and click {<span>Score</span>} to get
										graded!
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
									<Typography
										paragraph
										className={classes.scoreText}
									>
										{score
											? `Your score is: ${score}%!`
											: ''}
									</Typography>
								</CardContent>
							</Card>
						</Fade>
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
		</ThemeProvider>
	);
}
