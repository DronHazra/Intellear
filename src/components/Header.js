import React from 'react';
import { AppBar, Typography, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import MicrophoneSwitch from './microphone_switch';

const useStyles = makeStyles(() => ({
	typographyStyles: {
		flex: 1,
	},
}));

function Header(props) {
	const classes = useStyles();
	return (
		<AppBar position='static'>
			<Toolbar>
				<Typography className={classes.typographyStyles}>
					Intellear
				</Typography>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
