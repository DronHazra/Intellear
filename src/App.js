import React, { useState, useEffect } from 'react';
import RecordPlayTranscribe from './components/RecordPlayTranscribe';
import Header from './components/Header';
import { ReactComponent as GithubLogo } from './static/iconmonstr-github-1.svg';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
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
	Backdrop,
	CircularProgress,
	CardActions,
	Divider,
	Collapse,
	SvgIcon,
	IconButton,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { MusicVAE } from '@magenta/music/node/music_vae';
import { sequences } from '@magenta/music/node/core';
import TextCard from './components/intellear_text';
import Process from './components/process';

export const StepContext = React.createContext({
	step: 0,
	changeStep: () => {},
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
	const [activeStep, setActiveStep] = useState(0);
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
		musicvae.sample(1, temperature).then((sample) => {
			newSample(sequences.mergeConsecutiveNotes(sample[0]));
			setActiveStep(1);
		});
	};
	const handleClose = () => {
		setGenComplete(false);
	};
	const handleExpansion = () => {
		setExpanded(!dialogExpanded);
	};
	return (
		<StepContext.Provider
			value={{ step: activeStep, changeStep: setActiveStep }}
		>
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
						{ios ? (
							<Typography>
								Looks like you're on iOS! Unfortunately, due to
								a{' '}
								<a href='https://github.com/WebKit/webkit/blob/4a4870b75b95a836b516163d45a5cbd6f5222562/Source/WebCore/Modules/webaudio/AudioContext.cpp#L109'>
									Webkit bug
								</a>
								, Intellear doesn't work on iOS
							</Typography>
						) : (
							<Typography>doing things...</Typography>
						)}
					</Grid>
				</Grid>
			</Backdrop>
			<Header />
			<Grid
				container
				direction='column'
				spacing={4}
				alignItems='center'
				className={classes.grid}
			>
				<Grid item />
				<Grid item>
					<Process />
				</Grid>
				<Grid item container direction='row' justify='center'>
					<Grid item xs={12} sm={10} md={9} lg={8}>
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
										<Grid item xs={10} md={9} lg={10}>
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
														sliderTimeout + 400,
												}}
												timeout={fadeLength}
											>
												<Typography align='right'>
													Difficulty
												</Typography>
											</Fade>
										</Grid>
										<Grid item xs={10} md={9} lg={10}>
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
										<Grid item xs={false} md={1} />
									</Grid>
								</CardContent>
								<Divider />
							</Collapse>
							<Fade in={!vaeDisabled} timeout={fadeLength}>
								<CardActions>
									<Button
										variant='outlined'
										color='secondary'
										size='large'
										onClick={generate}
										disabled={vaeDisabled}
										className={classes.generate}
										fullWidth
										disableElevation
									>
										Generate!
									</Button>
								</CardActions>
							</Fade>
						</Card>
					</Grid>
				</Grid>
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
					direction='row'
					alignItems='center'
					justify='center'
				>
					<Grid item xs={12} sm={10} md={9} lg={8}>
						<TextCard
							in={!vaeDisabled}
							timeout={fadeLength}
							score={score}
						/>
					</Grid>
				</Grid>
				<Grid
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
					<Grid item>
						<IconButton href='https://github.com/DronHazra/Intellear/issues'>
							<SvgIcon>
								<GithubLogo />
							</SvgIcon>
						</IconButton>
					</Grid>
					<Grid item xs={4}>
						<Typography variant='body2' align='left'>
							Powered by Magenta
						</Typography>
					</Grid>
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
				<Grid item>
					<Typography variant='body2' align='center'>
						Had an issue? Found a bug? Open an issue on the GitHub!
					</Typography>
				</Grid>
			</Grid> */}
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
		</StepContext.Provider>
	);
}
