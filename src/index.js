import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core';
import { grey, cyan } from '@material-ui/core/colors';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: grey[900],
		},
		secondary: {
			main: cyan['A400'],
		},
		divider: cyan['A400'],
	},
	overrides: {
		MuiSlider: {
			root: {
				marginBottom: -0.5,
			},
			thumb: {
				height: 16,
				width: 16,
				marginTop: -5.25,
				marginLeft: -10,
			},
			valueLabel: {
				left: '-50%',
			},
			track: {
				height: 6,
				borderRadius: 4,
			},
			rail: {
				height: 6,
				borderRadius: 4,
			},
		},
	},
});
ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
