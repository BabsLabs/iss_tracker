import React, { Component } from 'react'
import PropTypes from 'prop-types';
import ShowMarkerButton from './ShowMarkerButton';
import HideMarkerButton from './HideMarkerButton';
import eventsLogo from '../images/event.png'
import observatoryLogo from '../images/observatory.png'

class MarkerToggleControl extends Component {
  constructor(props) {
    super(props);
    this.handleShowClick = this.handleShowClick.bind(this)
    this.handleHideClick = this.handleHideClick.bind(this)
    this.state = {
      isShowing: false
    }
  }

  handleShowClick() {
    this.setState({ isShowing: true })
  }

  handleHideClick() {
    this.setState({ isShowing: false })
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