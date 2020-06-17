import React, { Component } from 'react'
import ShowObservatoriesButton from './ShowObservatoriesButton'
import HideObservatoriesButton from './HideObservatoriesButton'

class ObservatoryControl extends Component {
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
      button = <HideObservatoriesButton onClick={this.handleHideClick} />;
    } else {
      button = <ShowObservatoriesButton onClick={this.handleShowClick} />;
    }

    return (
      <div>
        {button}
      </div>
    )
  }
}

export default ObservatoryControl