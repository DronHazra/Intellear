import React, { useState, useEffect } from 'react';
import TemperatureSlider from './components/slider';
import GenerateButton from './components/generate_button';
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
} from '@material-ui/core';
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
export default function App() {
	const [value, setVal] = useState(1.0);
	const url =
		'https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_4bar_med_lokl_q2';
	const [vaeDisabled, disableVAE] = useState(true);
	const [musicvae, setVAE] = useState('');
	const [score, setScore] = useState(null);

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

	const generate = async () => {
		disableVAE(true);
		const sample = await musicvae.sample(1, value);
		disableVAE(false);
		newSample(sequences.mergeConsecutiveNotes(sample[0]));
	};

	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<Grid container direction='column' spacing={5}>
				<Grid item>
					<Header />
				</Grid>
				<Grid
					item
					container
					direction='row'
					alignItems='center'
					justify='space-evenly'
				>
					<Grid item xs={1}>
						<TemperatureSlider
							defaultValue={value}
							callback={setVal}
						/>
					</Grid>
					<Grid item xs={2}>
						<GenerateButton
							temperature={value}
							callback={generate}
							disabled={vaeDisabled}
						/>
						<Typography>
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
					<Grid item xs={2} />
					<Paper elevation={5}>
						<div className='staffArea'></div>
						<Typography>Your score is: {score}%!</Typography>
					</Paper>
					<Grid item xs={2} />
				</Grid>
			</Grid>
		</MuiThemeProvider>
	);
}
