import React from 'react';
import {
	AppBar,
	Typography,
	Toolbar,
	Fade,
	//Button,
	//SvgIcon,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
//import { ReactComponent as MagentaLogo } from '../static/magenta.svg';

const useStyles = makeStyles(() => ({
	typographyStyles: {
		flex: 1,
	},
}));

export default function Header(props) {
	const classes = useStyles();

	return (
		<Fade in={true} timeout={500}>
			<AppBar position='static'>
				<Toolbar>
					<Typography
						className={classes.typographyStyles}
						variant='h5'
					>
						Intellear
					</Typography>
					{/*
					<image src='https://magenta.tensorflow.org/assets/magenta-logo.png' />
					<Button
						color='secondary'
						endIcon={
							<SvgIcon>
								<MagentaLogo />
							</SvgIcon>
						}
						href='https://magenta.tensorflow.org/'
						size='large'
					>
						Powered by{' '}
					</Button>*/}
				</Toolbar>
			</AppBar>
		</Fade>
	);
}
