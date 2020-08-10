import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { AppContext } from '../App';
import { useContext } from 'react';
import tap from '../sounds/ui_tap.wav';
const tapAudio = new Audio(tap);

export default function PlayRecordingButton(props) {
	const step = useContext(AppContext);
	const [playing, toggle] = useState(false);
	const [player, setPlayer] = useState(new Audio(props.url));
	const mobile = step.mobile;

	const handleClick = () => {
		tapAudio.play();
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
		// update audio player whenever the recorded audio changes
		setPlayer(new Audio(props.url));
	}, [props.url]);
	useEffect(() => {
		if (player.ended) {
			toggle(false);
		}
	});
	return (
		<Button
			{...props}
			onClick={handleClick}
			startIcon={<PlayArrowIcon />}
			disabled={props.disabled}
		>
			{mobile ? '' : 'Play'}
		</Button>
	);
}
