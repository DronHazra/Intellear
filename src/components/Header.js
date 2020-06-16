import React from 'react';
import {
	AppBar,
	Typography,
	Toolbar,
	Fade,
	Button,
	SvgIcon,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ReactComponent as GithubLogo } from '../iconmonstr-github-1.svg';

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
					<Button
						color='inherit'
						endIcon={
							<SvgIcon>
								<GithubLogo />
							</SvgIcon>
						}
						href='https://github.com/DronHazra/Intellear'
						size='large'
					>
						Give Feedback
					</Button>
				</Toolbar>
			</AppBar>
		</Fade>
	);
}
