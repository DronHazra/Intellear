import React, { useState } from 'react';
import RecordPlayTranscribe from './components/RecordPlayTranscribe';
import MyHeader from './components/Header';
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
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { sequences } from '@magenta/music/node/core';
import TextCard from './components/intellear_text';
import Process from './components/process';
//eslint-disable-next-line
import worker from 'workerize-loader!./worker.js';
import Footer from './material_kit_react/Footer/Footer';

export const AppContext = React.createContext({
	step: 0,
	changeStep: () => {},
	recordingBroken: false,
	safari: window.webkitOfflineAudioContext ? true : false,
});

const useStyles = makeStyles((theme) => ({
	app: {
		zIndex: '3',
		position: 'relative',
		marginTop: theme.spacing(-47),
	},
	root: {
		margin: 6,
	},
	scoreText: {
		fontSize: '1.1rem',
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
		marginBottom: theme.spacing(0),
	},
	grid: {
		margin: theme.spacing(0),
		flexGrow: 0,
		maxWidth: `100%`,
		flexBasis: `100%`,
	},
	scoreCard: {
		borderRadius: theme.spacing(4),
		padding: theme.spacing(2, 0),
	},
	scoreElement: {
		margin: theme.spacing(-3, 0, -2),
	},
}));
// const generateWorker = new GenerateWorker();

export default function App() {
	const [temperature, setTemperature] = useState(1.0);
	const [dialogExpanded, setExpanded] = useState(true);
	const [score, setScore] = useState(null);
	const [tempo, setTempo] = useState(120);
	const [isGenerating, setGenerating] = useState(false);
	const [genComplete, setGenComplete] = useState(false);
	const [activeStep, setActiveStep] = useState(0);
	let safari = window.webkitOfflineAudioContext ? true : false;
	const sliderTimeout = 400;
	const fadeLength = 750;
	const classes = useStyles();
	const [scoreSnack, setScoreSnack] = useState(false);
	const scoreCallback = (n) => {
		setScoreSnack(true);
		setScore(n);
	};
	let instance = worker();
	const fades = {
		header: 500,
		subheader: 800,
		card: 1100,
		video: 1400,
		process: 1400,
		dialog: 1700,
	};

	const [currentSample, newSample] = useState(null);

	const handleClose = () => {
		setGenComplete(false);
	};
	const handleExpansion = () => {
		setExpanded(!dialogExpanded);
	};
	// useEffect(() => {
	// 	setScoreSnack(true);
	// }, [score, scoreSnack]);
	const generate = () => {
		setGenerating(true);
		instance.generate(temperature).then((sample) => {
			newSample(sequences.mergeConsecutiveNotes(sample));
			setActiveStep(1);
			setGenerating(false);
			setGenComplete(true);
		});
	};
	return (
		<AppContext.Provider
			value={{
				step: activeStep,
				changeStep: setActiveStep,
				recordingBroken: navigator.mediaDevices ? false : true,
			}}
		>
			<Backdrop
				open={navigator.userAgent.indexOf('iPhone OS 12_0') >= 0}
				className={classes.backdrop}
			>
				<Grid
					container
					direction='column'
					justify='center'
					alignItems='center'
				>
					<Grid item>
						<Typography color='inherit'>
							Because of some WebAudio issues, we can't get
							Intellear to work on your iOS device :(. It works on
							Android and desktop browsers, so we suggest using
							another device. Sorry about that ;-;
						</Typography>
					</Grid>
				</Grid>
			</Backdrop>
			<Backdrop
				open={safari}
				className={classes.backdrop}
				onClick={() => (safari = false)}
			>
				<Grid
					container
					direction='column'
					justify='center'
					alignItems='center'
				>
					<Grid item>
						<Typography color='inherit'>
							It looks like you're using Safari! Unfortunately
							because of a
							<a href='https://github.com/WebKit/webkit/blob/4a4870b75b95a836b516163d45a5cbd6f5222562/Source/WebCore/Modules/webaudio/AudioContext.cpp#L109'>
								WebKit bug
							</a>
							, transcription is significantly slower on Safari
							than other browsers.
						</Typography>
					</Grid>
				</Grid>
			</Backdrop>
			<Backdrop
				open={navigator.userAgent.indexOf('iPhone OS 12_0') >= 0}
				className={classes.backdrop}
			>
				<Grid
					container
					direction='column'
					justify='center'
					alignItems='center'
				>
					<Grid item>
						<Typography color='inherit'>
							Because of some WebAudio issues, we can't get
							Intellear to work on your iOS device :(. It works on
							Android and desktop browsers, so we suggest using
							another device. Sorry about that ;-;
						</Typography>
					</Grid>
				</Grid>
			</Backdrop>
			<MyHeader
				inHeader={fades.header}
				inSubheader={fades.subheader}
				timeout={fadeLength}
			/>
			<div className={classes.app}>
				<Grid
					container
					direction='column'
					spacing={10}
					alignItems='center'
					className={classes.grid}
				>
					<Grid item />
					<Grid
						item
						container
						direction='row'
						alignItems='center'
						justify='center'
					>
						<Grid item xs={12} sm={10} md={9} lg={8}>
							<TextCard
								in={true}
								timeout={fadeLength}
								style={{ transitionDelay: fades.card }}
								score={score}
							/>
						</Grid>
					</Grid>

					<Grid item>
						<Process
							in={true}
							timeout={fadeLength}
							style={{ transitionDelay: fades.process }}
						/>
					</Grid>

					<Grid item container direction='row' justify='center'>
						<Grid item xs={12} sm={10} md={9} lg={8}>
							<Fade
								in={true}
								timeout={fadeLength}
								style={{ transitionDelay: fades.dialog }}
							>
								<Card
									variant='outlined'
									className={classes.dialog}
								>
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
										<CardContent
											className={classes.content}
										>
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
															color='secondary'
														/>
													</Fade>
												</Grid>
												<Grid item xs={false} md={1} />
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
															value={temperature}
															onChange={(
																e,
																newValue
															) =>
																setTemperature(
																	newValue
																)
															}
															valueLabelDisplay='off'
															color='secondary'
															min={0.5}
															step={0.0001}
															max={3}
														/>
													</Fade>
												</Grid>
												<Grid item xs={false} md={1} />
											</Grid>
											<div className='staffArea'></div>
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
						</Grid>
					</Grid>
					{score ? (
						<>
							<Grid
								item
								container
								direction='row'
								alignItems='center'
								justify='center'
								className={classes.scoreElement}
							>
								<Grid item xs={4} sm={3} md={2}>
									<Fade
										in={score ? true : false}
										timeout={fadeLength}
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
								</Grid>
							</Grid>
						</>
					) : (
						''
					)}
					<Grid
						item
						container
						direction='row'
						alignItems='center'
						justify='center'
					>
						<Grid item xs={12} sm={10} md={9} lg={8}>
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
						direction='column'
						alignContent='center'
					>
						<Grid item>
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
									src='https://www.youtube-nocookie.com/embed/wnxTqxL7pBQ'
									allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
									scrolling='auto'
									frameBorder='0'
									allowFullScreen
								/>
							</Fade>
						</Grid>
					</Grid>
					{/* <Grid
						item
						container
						direction='row'
						justify='center'
						alignItems='center'
						className={classes.footer}
					>
						<Grid item xs={4}>
							<Typography variant='body2' align='right'>
								Intellear
							</Typography>
						</Grid>
						<Grid item xs={1} />
						{/* <Grid item>
							<IconButton href='https://github.com/DronHazra/Intellear/issues'>
								<SvgIcon>
									<GithubLogo />
								</SvgIcon>
							</IconButton>
						</Grid> */}
					{/* <Grid item xs={4}>
							<Typography variant='body2' align='left'>
								Powered by Magenta
							</Typography>
						</Grid> */}
					{/* </Grid> */}
				</Grid>
				<Footer />
			</div>
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
				<Alert onClose={handleClose} severity='success'>
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
