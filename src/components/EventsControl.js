import React, { Component } from 'react'
import ShowEventsButton from './ShowEventsButton'
import HideEventsButton from './HideEventsButton'

class EventsControl extends Component {
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
    let button;
    if (isShowing) {
      button = <HideEventsButton onClick={this.handleHideClick} />;
    } else {
      button = <ShowEventsButton onClick={this.handleShowClick} />;
    }

    return (
      <div>
        {button}
      </div>
    )
  }
}

export default EventsControl