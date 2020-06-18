import React from 'react'
import eventsLogo from '../images/event.png'

export default function HideEventsButton(props) {
  return (
    <button>
      <img src={eventsLogo} onClick={props.onClick} className="button not-toggled event-toggle toggle" alt="event toggle" />
    </button>
  )
}
