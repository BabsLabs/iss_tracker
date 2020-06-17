import React, { Component } from 'react';
import NegativeIssLogo from '../images/ISS.png';
import observatoryLogo from '../images/observatory.png';

class InstructionPopup extends Component {
  render() {
    return (
      <div id="instructions">
        <h1>International Space Station (ISS) Tracker</h1>
        <p>Click the ISS marker <img src={NegativeIssLogo} alt="(ISS LOGO)" className="iss-marker" /> for more info</p>
        <p>The position of the ISS is updated every 3 seconds</p>
        <p>Toggle all NASA registered ground based observatories by clicking the Observatory Toggle button<img src={observatoryLogo} alt="(ISS LOGO)" id="observatory-toggle-instructions" /></p>
        <p>Click an Observatory marker <img src={observatoryLogo} alt="(Observatory Marker)" className="observatory-marker" /> for more info</p>
        <h2>(Click to Proceed)</h2>
      </div>
    )
  }
}

export default InstructionPopup