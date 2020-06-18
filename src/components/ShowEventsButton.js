import React from 'react'
import eventsLogo from '../images/event.png'

export default function ShowEventsButton(props) {
  return (
    <button>
      <img src={eventsLogo} onClick={props.onClick} className="button toggled event-toggle toggle" alt="event toggle" />
    </button>
  )
}
