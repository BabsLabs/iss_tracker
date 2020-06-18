import React, { Component } from 'react'
import PropTypes from 'prop-types';
import ShowObservatoriesButton from './ShowObservatoriesButton'
import HideObservatoriesButton from './HideObservatoriesButton'
import ShowEventsButton from './ShowEventsButton'
import HideEventsButton from './HideEventsButton'

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
    const isShowing = this.state.isShowing;
    let buttonName = this.props.name;
    let button;

    if (buttonName === 'Events') {
      if (isShowing) {
        button = <HideEventsButton onClick={this.handleHideClick} />;
      } else {
        button = <ShowEventsButton onClick={this.handleShowClick} />;
      }
    } else if (buttonName === 'Observatories') {
      if(isShowing) {
        button = <HideObservatoriesButton onClick={this.handleHideClick} />;
      } else {
        button = <ShowObservatoriesButton onClick={this.handleShowClick} />;
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