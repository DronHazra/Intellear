import React from 'react';
import styled from 'styled-components';

const sliderThumbStyles = props => {
    return(`
        width: 25px;
        height: 25px;
        background: ${props.color};
        cursor: pointer;
        outline: 5px solid #5bd5d9;
        opacity: ${props.opacity};
        -webkit-transition: .2s;
        transition: opacity .2s`); 
}

const Styles = styled.div`
    display: flex;
    align-items: center;
    margin: 2rem;
    .value{
        flex: 1;
        font-size: 2rem;
        color: #5bd5d9;
        align-items: right;
    }
    .slider {
        flex: 6;
        /*-webkit-appearance: none;*/
        width: 15rem;
        height: 15px;
        border-radius: 5px;
        background: #efefef;
        outline: none;
        background-color: #5bd5d9;

        /*&::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            ${props => sliderThumbStyles(props)}
        }

        &::-moz-range-thumb {
            ${props => sliderThumbStyles(props)}
        }*/
    }
`;

export default class Slider extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: 3
        };
        
    }

    handleOnChange = e => {
        this.setState({value: e.target.value});
        this.props.sendTemperature(this.state.value);
    }
    render() {
        return(
            <Styles>
                <input type="range" className="slider" min={1} max={5} value={this.state.value} onChange={this.handleOnChange.bind(this)} />
                <div className="value">{this.state.value} </div>
            </Styles>
        );
    }
}