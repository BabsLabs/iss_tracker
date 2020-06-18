import React from 'react'
import observatoryLogo from '../images/observatory.png'

export default function ShowObservatoriesButton(props) {
  return (
    <button>
      <img src={observatoryLogo} onClick={props.onClick} className="button toggled toggle" alt="observatory toggle"/>
    </button>
  )
}
