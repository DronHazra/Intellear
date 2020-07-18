/*eslint-disable*/
import React from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// nodejs library that concatenates classes
import classNames from 'classnames';
// material-ui core components
import { List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
import Favorite from '@material-ui/icons/Favorite';

import styles from '../footerStyle.js';

const useStyles = makeStyles(styles);

export default function Footer(props) {
	const classes = useStyles();
	const { whiteFont } = props;
	const footerClasses = classNames({
		[classes.footer]: true,
		[classes.footerWhiteFont]: whiteFont,
	});
	const aClasses = classNames({
		[classes.a]: true,
		[classes.footerWhiteFont]: whiteFont,
	});
	return (
		<footer className={footerClasses}>
			<div className={classes.container}>
				<div className={classes.left}>
					<List className={classes.list}>
						<ListItem className={classes.inlineBlock}>
							<a
								href='https://github.com/DronHazra/Intellear'
								className={classes.block}
								target='_blank'
							>
								Code
							</a>
						</ListItem>
						<ListItem className={classes.inlineBlock}>
							<a
								href='https://medium.com/@dronh.to/intellear-ai-powered-ear-training-for-musicians-f4338fbd754b'
								className={classes.block}
								target='_blank'
							>
								Blog
							</a>
						</ListItem>
					</List>
				</div>
				<div className={classes.right}>
					Intellear &copy; {1900 + new Date().getYear()}, powered by{' '}
					<a
						href='https://magenta.tensorflow.org/'
						className={aClasses}
						target='_blank'
					>
						Google Magenta
					</a>{' '}
					with <Favorite className={classes.icon} />
				</div>
			</div>
		</footer>
	);
}

Footer.propTypes = {
	whiteFont: PropTypes.bool,
};
