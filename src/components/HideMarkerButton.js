import React from 'react'
import PropTypes from 'prop-types';

function HideMarkerButton(props) {
  let name = props.name
  return (
    <button>
      <img src={props.image} onClick={props.onClick} className={name + "-toggle toggle not-toggled button"} alt={name + " toggle"} />
    </button>
  )
}

HideMarkerButton.propTypes = {
  name: PropTypes.string
};

export default HideMarkerButton