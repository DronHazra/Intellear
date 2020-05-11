import React from 'react';
const magentaModel = require('@magenta/music/node/music_vae');
const core = require('@magenta/music/node/core');

const url = 'https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_chords';


export default class PlayButton extends React.Component {

    constructor(props) {
        super(props);
        this.loadModel = this.loadModel.bind(this);
        this.loadModel()
    }

    loadModel() {
        this.musicvae = new magentaModel.MusicVAE(url);
        this.player = new core.Player();
        this.musicvae.initialize();
    }

    render() {
        const temperature = this.props.temperature;
        return(
            <button onClick={this.generate.bind(this, temperature)}>{this.musicvae.isInitialized() ? 'Generate!':'Loading...'} </button>
        );
    }

    generate = (temperature) => {
        if(this.musicvae.isInitialized()){
            console.log(temperature)
            this.musicvae.sample(1, temperature, ['C'], ).then((sample) => this.player.start(sample[0]));
        }
    }
}