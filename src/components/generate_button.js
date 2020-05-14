import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

export default function GenerateButton(props) {
    const [text, setText] = useState('Generate!');
    const generate = () => {
        if(!props.disabled){
            setText('Generating...');
            props.callback().then(() => setText('Generate!'));
        }
    }
    
    return (
        <Button variant="contained" color="primary" onClick={generate} disabled={props.disabled} >{text}{props.temperature} </Button>
    );
}