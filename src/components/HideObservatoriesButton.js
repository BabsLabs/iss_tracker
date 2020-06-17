import React from 'react'
import observatoryLogo from '../images/observatory.png'

export default function HideObservatoriesButton(props) {
  return (
    <button>
      <img src={observatoryLogo} onClick={props.onClick} className="button not-toggled observatory-toggle" alt="observatory toggle"/>
    </button>
  )
}
