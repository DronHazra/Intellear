import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import HearingIcon from '@material-ui/icons/Hearing';
import { SoundFontPlayer, sequences } from '@magenta/music/node/core';

export default function PlayButton(props) {
	const [player] = useState(
		new SoundFontPlayer(
			'https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus'
		)
	);

	const compareQuantizedNotes = (a, b) => {
		if (a.quantizedStartStep < b.quantizedStartStep) {
			return -1;
		}
		if (a.quantizedStartStep > b.quantizedStartStep) {
			return 1;
		}
		if (a.pitch < b.pitch) {
			return -1;
		}
		return 1;
	};
	const makeClickSequence = (seq) => {
		const clickSeq = sequences.createQuantizedNoteSequence();
		const sixteenthEnds = seq.notes.map((n) => n.quantizedEndStep);
		const lastSixteenth = Math.max(...sixteenthEnds);
		for (let i = 0; i < lastSixteenth; i += 4) {
			const click = {
				pitch: i % 16 === 0 ? 89 : 90,
				quantizedStartStep: i,
				isDrum: true,
				quantizedEndStep: i + 1,
			};
			clickSeq.notes.push(click);
		}
		clickSeq.notes.sort(compareQuantizedNotes);
		return clickSeq;
	};
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
