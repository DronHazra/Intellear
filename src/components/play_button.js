import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import HearingIcon from '@material-ui/icons/Hearing';
import { SoundFontPlayer } from '@magenta/music/node/core';

export default function PlayButton(props) {
	const [player, setPlayer] = useState(
		new SoundFontPlayer(
			'https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus'
		)
	);
	//player.playClick = true;

	const play = () => {
		player.stop();
		player.start(props.sequence).then(() => player.stop());
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
