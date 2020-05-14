import React, { useState } from 'react';
import TemperatureSlider from './components/slider'
import GenerateButton from './components/generate_button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const magentaModel = require('@magenta/music/node/music_vae');

export default function App() {
  const [value, setVal] = useState(1.0)
  const url = 'https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_4bar_med_lokl_q2';
  const[modelDisabled, disableModel] = useState(true);
  const loadModel = () => {
    const model = new magentaModel.MusicVAE(url);
    model.initialize().then(() => {
        console.log(modelDisabled);
        disableModel(false);
        console.log(modelDisabled);
    });
    return model
  }
  const [musicvae, init] = useState(loadModel);

  const tempCallback = (val) => {
    setVal(val);
  }
  const [player, setPlayer] = useState(new core.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus'));

  const generate = () => {
    disableModel(true);
    return musicvae.sample(1, value)
    .then((sample) => {
      disableModel(false);
      newSample(sample[0]);
    });
  }
  const [currentSample, newSample] = useState('');

  return (
    <Grid container direction="column" spacing={10}>
      <Grid item><Typography variant="h1">Intellear</Typography></Grid>
      <Grid item container direction="row" spacing={10}>
        <Grid item xs={1} />
        <Grid item xs={3}>
          <TemperatureSlider defaultValue={value} callback={tempCallback} />
        </Grid>
        <Grid item>
          <GenerateButton temperature={value} callback={generate} disabled={modelDisabled} />
        </Grid>
        <Grid item xs={5} />
      </Grid>
    </Grid>
  );
}
