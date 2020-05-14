import React, { useState } from "react";
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { SoundFontPlayer } from '@magenta/music/node/core';

export default function PlayButton(props) {
    const [player, setPlayer] = useState(new SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus'));
    //player.playClick = true;

    const play = () => {
        player.start(props.sequence).then(() => player.stop());
    }
    return(
        <IconButton aria-label="play" color="secondary" onClick={play} >
            <PlayCircleFilledIcon />
        </IconButton>
    )
}