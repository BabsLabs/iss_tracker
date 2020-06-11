import React, { Component } from 'react';
import NegativeIssLogo from '../images/ISS.png';

class InstructionPopup extends Component {
  render() {
    return (
      <div id="instructions">
        <h1>International Space Station (ISS) Tracker</h1>
        <p>Click the ISS logo <img src={NegativeIssLogo} alt="(ISS LOGO)" className="marker" /> for more info</p>
        <p>The position of the ISS is updated every 3 seconds</p>
        <h3>Click to Proceed</h3>
      </div>
    )
  }
}

export default InstructionPopup