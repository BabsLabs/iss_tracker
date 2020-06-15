import React from 'react'


export default function FollowButton(props) {
  return (
    <button onClick={props.onClick} className='button-follow not-following'>
      Follow
    </button>
  )
}
