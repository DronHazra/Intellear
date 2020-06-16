import React, { useState, useEffect } from 'react';
import RecordPlayTranscribe from './components/RecordPlayTranscribe';
import Header from './components/Header';
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
	Slider,
	Snackbar,
	Card,
	CardContent,
	CardActionArea,
	Fade,
	Backdrop,
	CircularProgress,
	CardActions,
	Divider,
	Collapse,
} from '@material-ui/core';
import { grey, teal } from '@material-ui/core/colors';
import { Alert, AlertTitle } from '@material-ui/lab';
import { MusicVAE } from '@magenta/music/node/music_vae';
import { sequences } from '@magenta/music/node/core';
import TextCard from './components/intellear_text';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: grey[900],
		},
		secondary: {
			main: teal['A400'],
		},
		divider: teal['A400'],
	},
	overrides: {
		MuiSlider: {
			root: {
				marginBottom: -0.5,
			},
			thumb: {
				height: 16,
				width: 16,
				marginTop: -5.25,
				marginLeft: -10,
			},
			valueLabel: {
				left: '-50%',
			},
			track: {
				height: 6,
				borderRadius: 4,
			},
			rail: {
				height: 6,
				borderRadius: 4,
			},
		},
	},
});
const useStyles = makeStyles((theme) => ({
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
	cardHeading: {
		margin: theme.spacing(2.5, 4),
		fontSize: 20,
	},
	content: {
		margin: theme.spacing(1, 0),
	},
}));
export default function App() {
	const [temperature, setTemperature] = useState(1.0);
	const url =
		'https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_4bar_med_lokl_q2';
	const [dialogExpanded, setExpanded] = useState(true);
	const [vaeDisabled, disableVAE] = useState(true);
	const [musicvae, setVAE] = useState('');
	const [score, setScore] = useState(null);
	const [tempo, setTempo] = useState(120);
	const [genComplete, setGenComplete] = useState(false);
	const [ios] = useState(
		navigator.platform === 'iPhone' || navigator.platform === 'iPad'
	);
	const sliderTimeout = 400;
	const fadeLength = 750;
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
	}, [ios]);
	const [currentSample, newSample] = useState(null);

	const generate = () => {
		setGenComplete(true);
		musicvae
			.sample(1, temperature)
			.then((sample) =>
				newSample(sequences.mergeConsecutiveNotes(sample[0]))
			);
	};
	const handleClose = () => {
		setGenComplete(false);
	};
	const handleExpansion = () => {
		setExpanded(!dialogExpanded);
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
								? `Looks like you're on iOS! Unfortunately, due to a ${(
										<a href='https://github.com/WebKit/webkit/blob/4a4870b75b95a836b516163d45a5cbd6f5222562/Source/WebCore/Modules/webaudio/AudioContext.cpp#L109'>
											Webkit bug
										</a>
								  )}, Intellear doesn't work on iOS :(`
								: 'doing things...'}
						</Typography>
					</Grid>
				</Grid>
			</Backdrop>
			<Grid container direction='column' spacing={4}>
				<Grid item>
					<Header />
				</Grid>
				<Grid item container direction='row'>
					<Grid item lg={2} />
					<Grid item xs={12} lg={8}>
						<Card variant='outlined' className={classes.dialog}>
							<CardActionArea
								onClick={handleExpansion}
								className={classes.cardAction}
							>
								<Typography
									color='primary'
									variant='h1'
									className={classes.cardHeading}
								>
									Making the music :)
								</Typography>
								<Divider />
							</CardActionArea>
							<Collapse
								in={dialogExpanded}
								timeout='auto'
								unmountOnExit
							>
								<CardContent className={classes.content}>
									<Grid
										container
										direction='row'
										spacing={1}
										alignItems='center'
									>
										<Grid item xs={2} lg={1}>
											<Fade
												in={true}
												style={{
													transitionDelay: sliderTimeout,
												}}
												timeout={fadeLength}
											>
												<Typography align='right'>
													Tempo
												</Typography>
											</Fade>
										</Grid>
										<Grid item xs={10} lg={10}>
											<Fade
												in={true}
												style={{
													transitionDelay: sliderTimeout,
												}}
												timeout={fadeLength}
											>
												<Slider
													value={tempo}
													onChange={(e, newValue) =>
														setTempo(newValue)
													}
													valueLabelDisplay='auto'
													min={50}
													max={150}
													color='secondary'
												/>
											</Fade>
										</Grid>
										<Grid item xs={false} lg={1} />
									</Grid>
									<Grid
										container
										direction='row'
										spacing={1}
										alignItems='center'
									>
										<Grid item xs={2} lg={1}>
											<Fade
												in={true}
												style={{
													transitionDelay:
														sliderTimeout + 400,
												}}
												timeout={fadeLength}
											>
												<Typography align='right'>
													Difficulty
												</Typography>
											</Fade>
										</Grid>
										<Grid item xs={10} lg={10}>
											<Fade
												in={true}
												style={{
													transitionDelay:
														sliderTimeout + 400,
												}}
												timeout={fadeLength}
											>
												<Slider
													value={temperature}
													onChange={(e, newValue) =>
														setTemperature(newValue)
													}
													valueLabelDisplay='off'
													color='secondary'
													min={0.5}
													step={0.0001}
													max={3}
												/>
											</Fade>
										</Grid>
										<Grid item xs={false} lg={1} />
									</Grid>
								</CardContent>
								<Divider />
							</Collapse>
							<Fade in={!vaeDisabled} timeout={fadeLength}>
								<CardActions>
									<Button
										variant='outlined'
										color='primary'
										onClick={generate}
										disabled={vaeDisabled}
										className={classes.generate}
										fullWidth
									>
										Generate!
									</Button>
								</CardActions>
							</Fade>
						</Card>
					</Grid>
					<Grid item lg={2} />
				</Grid>
				<Grid
					item
					container
					direction='row'
					alignItems='center'
					justify='center'
				>
					<Grid item xs={8}>
						<RecordPlayTranscribe
							sequence={currentSample}
							callback={scoreCallback}
							tempo={tempo}
							timeout={fadeLength}
							delay={sliderTimeout + 800}
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
						<TextCard
							in={!vaeDisabled}
							timeout={fadeLength}
							score={score}
						/>
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
					We're done generating — <strong>get ear training!</strong>
				</Alert>
			</Snackbar>
		</ThemeProvider>
	);
}
