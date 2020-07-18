import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { AppContext } from '../App';
import { useContext } from 'react';

export default function PlayRecordingButton(props) {
	const step = useContext(AppContext);
	const [playing, toggle] = useState(false);
	const [player, setPlayer] = useState(new Audio(props.url));
	const handleClick = () => {
		if (playing) {
			player.pause();
			toggle(false);
		} else {
			step.changeStep(4);
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
			startIcon={<PlayArrowIcon />}
			disabled={props.disabled}
		>
			Play
		</Button>
	);
}
