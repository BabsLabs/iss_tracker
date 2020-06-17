import React, { Component } from 'react'
import FollowButton from './FollowButton'
import StopFollowingButton from './StopFollowingButton'

class FollowControl extends Component {
  constructor(props) {
    super(props);
    this.handleFollowClick = this.handleFollowClick.bind(this)
    this.handleStopFollowingClick = this.handleStopFollowingClick.bind(this)
    this.state = {
      isFollowing: true
    }
  }

  handleFollowClick() {
    this.setState({isFollowing: true})
  }

  handleStopFollowingClick() {
    this.setState({isFollowing: false})
  }

  render() {
    const isFollowing = this.state.isFollowing;
    let button;
    if (isFollowing) {
      button = <StopFollowingButton onClick={this.handleStopFollowingClick} />;
    } else {
      button = <FollowButton onClick={this.handleFollowClick} />;
    }

    return (
      <div>
        {button}
      </div>
    )
  }
}

export default FollowControl