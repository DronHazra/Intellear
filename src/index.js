import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#00233D',
		},
		secondary: {
			main: '#D2338F',
		},
		divider: '#D2338F',
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
				borderRadius: 6,
			},
			rail: {
				height: 6,
				borderRadius: 6,
			},
		},
	},
});
ReactDOM.render(
	<React.StrictMode>
		<CssBaseline />
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
