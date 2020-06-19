import React from 'react'
import PropTypes from 'prop-types';

function MapStyleButton(props) {
  let name = props.name
  return (
    <button>
      <img src={props.image} onClick={props.onClick} className={name + "-toggle toggle button"} alt={name + "toggle"} />
    </button>
  )
}

MapStyleButton.propTypes = {
  name: PropTypes.string
};

export default MapStyleButton