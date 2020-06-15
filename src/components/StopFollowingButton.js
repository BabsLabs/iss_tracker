import React from 'react'

export default function StopFollowingButton(props) {
  return (
    <button onClick={props.onClick} className='button-follow following'>
      Stop Following
    </button>
  )
}
