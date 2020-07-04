import React from 'react';
import {
	Typography,
	Fade,
	Grid,
	//Button,
	//SvgIcon,
} from '@material-ui/core';
// import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import Parallax from '../material_kit_react/Parallax/Parallax';
//import { ReactComponent as MagentaLogo } from '../static/magenta.svg';

const useStyles = makeStyles((theme) => {
	return {
		container: {
			marginTop: theme.spacing(-45),
		},
		typographyStyles: {
			color: theme.palette.secondary.contrastText,
		},
	};
});

export default function MyHeader(props) {
	const classes = useStyles();

	return (
		// <Fade in={true} timeout={500}>
		<div>
			<Parallax image={require('../static/piano.jpg')}>
				<Grid
					container
					direction='column'
					spacing={1}
					className={classes.container}
				>
					<Grid item container direction='row'>
						<Grid item xs={1} lg={2} />
						<Grid item>
							<Fade
								in={true}
								style={{ transitionDelay: props.inHeader }}
								timeout={props.timeout}
							>
								<Typography variant='h2' color='secondary'>
									Intellear
								</Typography>
							</Fade>
						</Grid>
					</Grid>
					<Grid item container direction='row'>
						<Grid item xs={1} lg={2} />
						<Grid item>
							<Fade
								in={true}
								style={{
									transitionDelay: props.inSubheader,
								}}
								timeout={props.timeout}
							>
								<Typography
									variant='h4'
									className={classes.typographyStyles}
								>
									Level up your ear training.
								</Typography>
							</Fade>
						</Grid>
					</Grid>
				</Grid>
				<div className={classes.container}></div>
			</Parallax>
		</div>
		/* <AppBar position='static'>
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
					</Button>*/
		/* </Toolbar> */
		/* </AppBar> */
		// </Fade>
	);
}
