import React from 'react';

export const StepContext = React.createContext({
	step: 0,
	changeStep: () => {},
});
