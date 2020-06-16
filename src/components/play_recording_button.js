import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

export default function PlayRecordingButton(props) {
	const [playing, toggle] = useState(false);
	const [player, setPlayer] = useState(new Audio(props.url));
	const handleClick = () => {
		if (playing) {
			player.pause();
			toggle(false);
		} else {
			player.play();
			toggle(true);
		}
	};
	useEffect(() => {
		setPlayer(new Audio(props.url));
	}, [props.url]);
	useEffect(() => {
		if (player.ended) {
			toggle(false);
		}
	}, [player]);
	return (
		<Button
			{...props}
			onClick={handleClick}
			startIcon={playing ? <PauseIcon /> : <PlayArrowIcon />}
			disabled={props.disabled}
		>
			{playing ? 'Pause' : 'Play'}
		</Button>
	);
}
