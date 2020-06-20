import React, { Component } from 'react'
import PropTypes from 'prop-types';
import ShowMarkerButton from './ShowMarkerButton';
import HideMarkerButton from './HideMarkerButton';
import MapStyleButton from './MapStyleButton';
import eventsLogo from '../images/event.png'
import observatoryLogo from '../images/observatory.png'
import streetsLogo from '../images/streets.jpg'
import lightLogo from '../images/light.jpg'
import darkLogo from '../images/dark.jpg'
import satelliteLogo from '../images/satellite.jpg'
import instructionsLogo from '../images/instructions.png'

class MarkerToggleControl extends Component {
  constructor(props) {
    super(props);
    this.handleShowClick = this.handleShowClick.bind(this)
    this.handleHideClick = this.handleHideClick.bind(this)
    this.handleMapClick = this.handleMapClick.bind(this)
    this.state = {
      isShowing: false,
      index: 0
    }
  }

  handleShowClick() {
    this.setState({ isShowing: true })
  }

  handleHideClick() {
    this.setState({ isShowing: false })
  }

  handleMapClick() {
    let currentIndex = this.state.index
    if (currentIndex < 3) {
      let newIndex = this.state.index + 1;
      this.setState({ index: newIndex })
    } else (
      this.setState({ index: 0 })
    )
  }

  render() {
    let isShowing = this.state.isShowing;
    let buttonName = this.props.name;
    let button;

    if (buttonName === 'Events') {
      if (isShowing) {
        button = <HideMarkerButton image={eventsLogo} name={"event"} onClick={this.handleHideClick} />;
      } else {
        button = <ShowMarkerButton image={eventsLogo} name={"event"} onClick={this.handleShowClick} />;
      }
    }  

    if (buttonName === 'Observatories') {
      if(isShowing) {
        button = <HideMarkerButton image={observatoryLogo} name={"observatory"} onClick={this.handleHideClick} />;
      } else {
        button = <ShowMarkerButton image={observatoryLogo} name={"observatory"} onClick={this.handleShowClick} />;
      }
    }

    if (buttonName === 'Instructions') {
      if(isShowing) {
        button = <HideMarkerButton image={instructionsLogo} name={"instructions"} onClick={this.handleHideClick} />;
      } else {
        button = <ShowMarkerButton image={instructionsLogo} name={"instructions"} onClick={this.handleShowClick} />;
      }
    }

    if (buttonName === "Map") {
      switch (this.state.index) {
        case 0:
          return button = <MapStyleButton image={lightLogo} text={"light"} onClick={this.handleMapClick} />;
        case 1:
          return button = <MapStyleButton image={darkLogo} text={"dark"} onClick={this.handleMapClick} />;
        case 2:
          return button = <MapStyleButton image={satelliteLogo} text={"satellite"}  onClick={this.handleMapClick} />;
        case 3:
          return button = <MapStyleButton image={streetsLogo} text={"streets"} onClick={this.handleMapClick} />;
        default:
          return button = <MapStyleButton image={streetsLogo} text={"streets"} onClick={this.handleMapClick} />;
      }
    }

    return (
      <div>
        {button}
      </div>
    )
  }
}

MarkerToggleControl.propTypes = {
  name: PropTypes.string
};

export default MarkerToggleControl