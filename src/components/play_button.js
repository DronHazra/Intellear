import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import HearingIcon from '@material-ui/icons/Hearing';
import { SoundFontPlayer } from '@magenta/music/node/core';

export default function PlayButton(props) {
	const [player] = useState(
		new SoundFontPlayer(
			'https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus'
		)
	);

	const play = () => {
		player.stop();
		player.start(props.sequence, props.tempo).then(() => player.stop());
	};
	return (
		<Button
			{...props}
			onClick={play}
			startIcon={<HearingIcon />}
			disabled={props.disabled}
		>
			Listen
		</Button>
	);
}
