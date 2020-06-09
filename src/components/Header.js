import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
	typographyStyles: {
		flex: 1,
	},
}));

export default function Header(props) {
	const classes = useStyles();
	const [loadIn, setLoadIn] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setLoadIn(true), 100);
	});
	return (
		<Fade in={loadIn} timeout={200}>
			<AppBar position='static'>
				<Toolbar>
					<Typography
						className={classes.typographyStyles}
						variant='h5'
					>
						Intellear
					</Typography>
				</Toolbar>
			</AppBar>
		</Fade>
	);
}
