import React, { useState, useEffect } from 'react';
import TemperatureSlider from './components/slider';
import GenerateButton from './components/generate_button';
import Grid from '@material-ui/core/Grid';
import RecordPlayTranscribe from './components/RecordPlayTranscribe';
import { MusicVAE } from '@magenta/music/node/music_vae';
import PlayButton from './components/play_button';
import Header from './components/Header';
import { Button } from '@material-ui/core';
import MicrophoneSwitch from './components/microphone_switch';

export default function App() {
	const [value, setVal] = useState(1.0);
	const url =
		'https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_4bar_med_lokl_q2';
	const [vaeDisabled, disableVAE] = useState(true);
	const [musicvae, setVAE] = useState('');
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
		newSample(sample[0]);
	};

	return (
		<Grid container direction='column' spacing={10}>
			<Grid item>
				<Header />
			</Grid>
			<Grid
				item
				container
				direction='row'
				alignItems='center'
				justify='center'
			>
				<Grid item xs={1} />
				<Grid item xs={3}>
					<TemperatureSlider defaultValue={value} callback={setVal} />
				</Grid>
				<Grid
					item
					container
					direction='column'
					alignItems='center'
					justify='center'
					xs={4}
				>
					<Grid item>
						<GenerateButton
							temperature={value}
							callback={generate}
							disabled={vaeDisabled}
						/>
					</Grid>
				</Grid>
				<Grid item>
					<RecordPlayTranscribe sequence={currentSample} />
				</Grid>
				<Grid item xs={1} />
			</Grid>
		</Grid>
	);
}
