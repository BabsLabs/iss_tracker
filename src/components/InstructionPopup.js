import React, { Component } from 'react';
import NegativeIssLogo from '../images/ISS.png';
import observatoryLogo from '../images/observatory.png';
import eventLogo from '../images/event.png';
import lightLogo from '../images/light.jpg';

class InstructionPopup extends Component {
  render() {
    return (
      <div id="instructions" onClick={this.props.closePopup}>
        <h1>International Space Station (ISS) Tracker</h1>
        <p>Toggle markers with the Observatory and Event buttons<img src={observatoryLogo} alt="Observatory Toggle" className="toggle-instructions" /><img src={eventLogo} alt="Event Toggle" className="toggle-instructions" /></p>
        <p>Click markers <img src={NegativeIssLogo} alt="(ISS LOGO)" className="iss-marker marker" /> <img src={observatoryLogo} alt="Observatory Marker" className="observatory-marker marker" /> <img src={eventLogo} alt="Event Marker" className="event-marker marker" /> for more info</p>
        <p>Change the Map style with the <img src={lightLogo} alt="Style Toggle" className="toggle-instructions" /> button</p>
        <p>The position of the ISS is updated every 3 seconds</p>
        <h2>(Click to Proceed)</h2>
      </div>
    )
  }
}

export default InstructionPopup