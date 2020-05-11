import React from 'react';
import Slider from './components/slider'
import PlayButton from './components/play_button'
import styled from 'styled-components'
import './App.css';

const Styles = styled.div`
  display: flex;
  justify-content: center;
  .title {
    color: #FFFFFF;
    justify-content: center;
    font-size: 3rem;
  }
  .head {
    color: #FFFFFF;
    
  }
`;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      temperature: 3
    }
  }

  getTemperature = temperature => {
    this.setState({temperature: temperature});
    console.log(this.state.temperature, temperature);
    this.setState({temperature: temperature});
    console.log(this.state.temperature, temperature);
  }

  render() {
    return (
      <Styles>
        <div className="App">
          <div className="title">Intellear</div>
          <div className="head">
            <Slider sendTemperature={this.getTemperature.bind(this)} />
            {this.state.temperature}
            <PlayButton temperature={this.state.temperature} />
          </div>
          <div className="middle">
  
          </div>
          <div className="footer">
  
          </div>
        </div>
      </Styles>
    );
  }
}

export default App;
