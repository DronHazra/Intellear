// from magenta docs
/*eslint-disable*/
self.importScripts(
	'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.4.0/dist/tf.min.js'
);
self.importScripts(
	'https://cdn.jsdelivr.net/npm/@magenta/music@^1.12.0/es6/core.js'
);
self.importScripts(
	'https://cdn.jsdelivr.net/npm/@magenta/music@^1.12.0/es6/music_vae.js'
);
// const model = require('@magenta/music/es6/musicvae.js');

const mvae = new music_vae.MusicVAE(
	'https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_4bar_med_lokl_q2'
);

export async function generate(temp) {
	if (!mvae.isInitialized()) {
		await mvae.initialize();
	}

	const output = await mvae.sample(1, temp);
	return output[0];
}
