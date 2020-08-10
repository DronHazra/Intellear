import React, { useState, useEffect } from 'react';
import RecordPlayTranscribe from './components/RecordPlayTranscribe';
// import { ReactComponent as GithubLogo } from './static/iconmonstr-github-1.svg';
import { makeStyles } from '@material-ui/core/styles';
import {
	Grid,
	Typography,
	Button,
	Slider,
	Snackbar,
	Card,
	CardContent,
	CardActionArea,
	Fade,
	CardActions,
	Divider,
	Collapse,
	Paper,
	Backdrop,
	LinearProgress,
	Container,
	Link,
	useMediaQuery,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import * as mm from '@magenta/music/es6';
import TextCard from './components/intellear_text';
import Process from './components/process';
import Favorite from '@material-ui/icons/Favorite';
import notif1 from './sounds/generation.wav';
import loading from './sounds/ui_loading.wav';
import onLoad from './sounds/notification_ambient.wav';
import celebration from './sounds/navigation_selection-complete-celebration.wav';
//eslint-disable-next-line
// import worker from 'workerize-loader!./worker.js';

// this context is passed throughout the app to manage the process, distribute permissions and handle global ui changes. might refactor this into separate contexts in the future
export const AppContext = React.createContext({
	step: 0,
	changeStep: () => {},
	recordingBroken: false,
	safari: window.webkitOfflineAudioContext ? true : false,
	mobile: false,
});

const useStyles = makeStyles(theme => ({
	hero: {
		[theme.breakpoints.down('md')]: {
			height: '50vh',
			paddingTop: theme.spacing(10),
		},
		[theme.breakpoints.up('md')]: {
			height: '85vh',
			paddingTop: theme.spacing(20),
		},
		backgroundImage: 'url(/piano.jpg)',
		backgroundColor: theme.palette.background.paper,
		backgroundPosition: 'center bottom',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		marginRight: theme.spacing(-2),
	},
	app: {
		// zIndex: '3',
		// position: 'relative',
		marginTop: theme.spacing(-22),
		marginRight: 0,
		flexGrow: 1,
		// maxWidth: '100vw',
		padding: 14,
	},
	scoreText: {
		fontSize: '1.1rem',
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		maxWidth: '100vw',
		color: '#fff',
	},
	cardHeading: {
		margin: theme.spacing(2.5, 4),
		fontSize: 20,
	},
	generate: {
		transition: theme.transitions.duration.standard,
		border: `1px solid ${theme.palette.secondary.main}`,
		'&:hover': {
			// backgroundColor: `linear-gradient(60deg, ${theme.palette.secondary.light}, ${theme.palette.secondary.main})`,
			color: theme.palette.secondary.contrastText,
			backgroundColor: theme.palette.secondary.main,
		},
	},
	footer: {
		padding: theme.spacing(4),
		backgroundColor: theme.palette.primary.dark,
		color: theme.palette.primary.contrastText,
		marginRight: theme.spacing(-2),
	},
	scoreCard: {
		borderRadius: theme.spacing(4),
		padding: theme.spacing(2, 0),
	},
	// scoreElement: {
	// 	margin: theme.spacing(-3, 0, -2),
	// },
	video: {
		maxWidth: '100%',
	},
	icon: {
		width: '18px',
		height: '18px',
		position: 'relative',
		top: '3px',
	},
	dialog: {
		[theme.breakpoints.down('sm')]: {
			minWidth: '90vw',
		},
	},
}));
// const generateWorker = new GenerateWorker();

// load in the sound effects
const notif1Audio = new Audio(notif1);
const loadingAudio = new Audio(loading);
loadingAudio.loop = true;
const onPageLoadAudio = new Audio(onLoad);
const celebrationAudio = new Audio(celebration);

export default function App() {
	// check if the screen is small - doesn't change so doesn't need to be stateful
	const mobile = useMediaQuery(theme => theme.breakpoints.down('sm'));
	const classes = useStyles();
	const [mvae] = useState(
		new mm.MusicVAE(
			'https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_4bar_med_lokl_q2'
		)
	);
	const [temperature, setTemperature] = useState(1.0);

	// expand and contract the generation card
	const [dialogExpanded, setExpanded] = useState(true);
	const [score, setScore] = useState(null);
	const [tempo, setTempo] = useState(120);

	// used to inform the loading bars and the alert
	const [isGenerating, setGenerating] = useState(false);
	const [genComplete, setGenComplete] = useState(false);

	// control the steps of the process
	const [activeStep, setActiveStep] = useState(0);

	let safari = window.webkitOfflineAudioContext ? true : false;

	useEffect(() => {
		// play once the page loads
		onPageLoadAudio.play();
	}, []);

	// used to synchronize fades
	const sliderTimeout = 400;
	const fadeLength = 750;

	const [scoreSnack, setScoreSnack] = useState(false);

	const scoreCallback = n => {
		// this will be passed to child components to lift state up
		celebrationAudio.play();
		setScoreSnack(true);
		setScore(n);
	};
	// let instance = worker();

	const fades = {
		header: 500,
		subheader: 800,
		card: 1100,
		video: 1400,
		process: 1400,
		dialog: 1700,
	};

	const [currentSample, newSample] = useState(null);

	const playLoadingAudio = () => {
		// used to delay playing the loading audio
		setTimeout(() => loadingAudio.play(), 800);
	};

	const generate = async () => {
		setGenerating(true);
		playLoadingAudio();
		if (!mvae.isInitialized()) {
			await mvae.initialize();
		}

		const output = await mvae.sample(1, temperature);
		newSample(mm.sequences.mergeConsecutiveNotes(output[0]));
		setActiveStep(1);
		setGenerating(false);
		setGenComplete(true);
		loadingAudio.pause();
		notif1Audio.play();
		// unused worker code
		// instance.generate(temperature).then(sample => {
		// 	newSample(mm.sequences.mergeConsecutiveNotes(sample));
		// 	setActiveStep(1);
		// 	setGenerating(false);
		// 	setGenComplete(true);
		// 	loadingAudio.pause();
		// 	notif1Audio.play();
		// });
	};
	return (
		<AppContext.Provider
			value={{
				step: activeStep,
				changeStep: setActiveStep,
				recordingBroken: navigator.mediaDevices ? false : true,
				mobile: mobile,
			}}
		>
			<div className='backdrops'>
				<Backdrop
					open={navigator.userAgent.indexOf('iPhone OS 12_0') >= 0}
					className={classes.backdrop}
				>
					<Container>
						<Typography color='inherit'>
							Because of some WebAudio issues, we can't get
							Intellear to work on your iOS device :(. It works on
							Android and desktop browsers, so we suggest using
							another device. Sorry about that ;-;
						</Typography>
					</Container>
				</Backdrop>
				<Backdrop
					open={safari}
					className={classes.backdrop}
					onClick={() => (safari = false)}
				>
					<Container>
						<Typography color='inherit'>
							It looks like you're using Safari! Unfortunately
							because of a
							<a href='https://github.com/WebKit/webkit/blob/4a4870b75b95a836b516163d45a5cbd6f5222562/Source/WebCore/Modules/webaudio/AudioContext.cpp#L109'>
								WebKit bug
							</a>
							, transcription is significantly slower on Safari
							than other browsers.
						</Typography>
					</Container>
				</Backdrop>
			</div>
			<main>
				<div className={classes.hero}>
					<Container maxWidth='md'>
						<Fade
							in={true}
							timeout={fadeLength}
							style={{ transitionDelay: fades.header }}
						>
							<Typography
								component='h1'
								variant='h2'
								align='left'
								color='secondary'
								gutterBottom
							>
								Intellear
							</Typography>
						</Fade>
						<Fade
							in={true}
							timeout={fadeLength}
							style={{ transitionDelay: fades.subheader }}
						>
							<Typography
								variant='h5'
								align='left'
								style={{ color: '#fff' }}
							>
								Level up your ear training.
							</Typography>
						</Fade>
					</Container>
				</div>
				<div className={classes.app}>
					<Grid
						container
						direction='column'
						spacing={7}
						className={classes.grid}
					>
						<Grid item>
							<Container maxWidth='md' disableGutters>
								<TextCard
									in={true}
									timeout={fadeLength}
									style={{ transitionDelay: fades.card }}
									score={score}
								/>
							</Container>
						</Grid>

						<Grid item>
							<Container maxWidth='md' disableGutters>
								<Process
									in={true}
									timeout={fadeLength}
									style={{
										transitionDelay: fades.process,
									}}
								/>
							</Container>
						</Grid>

						<Grid item>
							<Container
								maxWidth='md'
								className={classes.dialog}
								disableGutters
							>
								<Fade
									in={true}
									timeout={fadeLength}
									style={{
										transitionDelay: fades.dialog,
									}}
								>
									<Card variant='outlined'>
										<CardActionArea
											onClick={() =>
												setExpanded(!dialogExpanded)
											}
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
											<CardContent>
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
													<Grid
														item
														xs={10}
														md={9}
														lg={10}
													>
														<Fade
															in={true}
															style={{
																transitionDelay: sliderTimeout,
															}}
															timeout={fadeLength}
														>
															<Slider
																value={tempo}
																onChange={(
																	e,
																	newValue
																) =>
																	setTempo(
																		newValue
																	)
																}
																valueLabelDisplay='auto'
																min={50}
																max={150}
																color='primary'
															/>
														</Fade>
													</Grid>
													<Grid
														item
														xs={false}
														md={1}
													/>
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
																	sliderTimeout +
																	400,
															}}
															timeout={fadeLength}
														>
															<Typography align='right'>
																Difficulty
															</Typography>
														</Fade>
													</Grid>
													<Grid
														item
														xs={10}
														md={9}
														lg={10}
													>
														<Fade
															in={true}
															style={{
																transitionDelay:
																	sliderTimeout +
																	400,
															}}
															timeout={fadeLength}
														>
															<Slider
																value={
																	temperature
																}
																onChange={(
																	e,
																	newValue
																) =>
																	setTemperature(
																		newValue
																	)
																}
																valueLabelDisplay='off'
																color='primary'
																min={0.5}
																step={0.0001}
																max={3}
															/>
														</Fade>
													</Grid>
													<Grid
														item
														xs={false}
														md={1}
													/>
												</Grid>
												<Container
													maxWidth='sm'
													style={{ overflow: 'auto' }}
												>
													<div className='staffArea'></div>
												</Container>
											</CardContent>
											<Divider />
										</Collapse>
										<div className='placeholder'>
											<Fade
												in={isGenerating}
												style={{
													transitionDelay: isGenerating
														? '800ms'
														: '0ms',
												}}
												unmountOnExit
											>
												<LinearProgress color='secondary' />
											</Fade>
										</div>
										<CardActions>
											<Button
												variant='outlined'
												color='secondary'
												size='large'
												onClick={generate}
												className={classes.generate}
												fullWidth
												disableElevation
											>
												Generate!
											</Button>
										</CardActions>
									</Card>
								</Fade>
							</Container>
						</Grid>
						<Grid item>
							<Container maxWidth='sm' disableGutters>
								<Fade
									in={score ? true : false}
									timeout={fadeLength}
									unmountOnExit
								>
									<Paper
										className={classes.scoreCard}
										variant='outlined'
									>
										<Typography
											className={classes.scoreText}
											align='center'
										>
											Your score is: {score}%!
										</Typography>
									</Paper>
								</Fade>
							</Container>
						</Grid>
						<Grid item>
							<Container maxWidth='md' disableGutters>
								<RecordPlayTranscribe
									sequence={currentSample}
									callback={scoreCallback}
									tempo={tempo}
									timeout={fadeLength}
									delay={sliderTimeout + 800}
								/>
							</Container>
						</Grid>
						<Grid item>
							<Container maxWidth='sm' disableGutters>
								<Fade
									in={true}
									timeout={fadeLength}
									style={{ transitionDelay: fades.video }}
								>
									<iframe
										className={classes.video}
										title='intellear-vid'
										width='560'
										height='315'
										src='https://www.youtube-nocookie.com/embed/uQQgxDqGBts?controls=0'
										allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
										scrolling='auto'
										frameBorder='0'
										allowFullScreen
									/>
								</Fade>
							</Container>
						</Grid>
					</Grid>
				</div>
			</main>
			<footer className={classes.footer}>
				<Typography variant='h6' align='center' gutterBottom>
					Powered w/ <Favorite className={classes.icon} /> by{' '}
					<a
						href='https://magenta.tensorflow.org/'
						style={{ color: '#D2338F' }}
					>
						Google Magenta
					</a>
					.
				</Typography>
				<Typography variant='body2' align='center'>
					{'Copyright © '}
					<Link
						color='inherit'
						href='https://github.com/DronHazra/Intellear'
					>
						Intellear
					</Link>{' '}
					{new Date().getFullYear()}
					{'. This project is licensed under the '}{' '}
					<Link
						color='inherit'
						href='https://github.com/DronHazra/Intellear/blob/master/LICENSE'
					>
						Apache License 2.0
					</Link>{' '}
					{'.'}
				</Typography>
			</footer>
			{/* <Grid
				item
				container
				direction='row'
				justify='center'
				alignItems='center'
				className={classes.footer}
			>
				<Grid item>
					<Typography variant='body2' align='center'>
						Had an issue? Found a bug? Open an issue on the GitHub!
					</Typography>
				</Grid>
			</Grid> */}
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				open={genComplete}
				onClose={() => setGenComplete(false)}
				autoHideDuration={6000}
			>
				<Alert onClose={() => setGenComplete(false)} severity='success'>
					We're done generating — <strong>get ear training!</strong>
				</Alert>
			</Snackbar>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				open={scoreSnack}
				onClose={() => setScoreSnack(false)}
				autoHideDuration={6000}
			>
				<Alert onClose={() => setScoreSnack(false)} severity='success'>
					Your robots are done! Your score is {score}%.
				</Alert>
			</Snackbar>
		</AppContext.Provider>
	);
}
