import { MusicVAE } from '@magenta/music/node/music_vae';
import { sequences } from '@magenta/music/node/core';
/* eslint-disable no-restricted-globals */
addEventListener('message', (e) => {
	console.log('hi!');
	const musicvae = new MusicVAE(
		'https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_4bar_med_lokl_q2'
	);
	postMessage('VAE online');
	if (typeof e !== 'number') return;
	musicvae
		.initialize()
		.then(() => musicvae.sample(1, e.data))
		.then((sample) => {
			postMessage(sequences.mergeConsecutiveNotes(sample[0]));
		})
		.then(() => musicvae.dispose())
		.catch((err) => console.error(err));
});
