import React from 'react'
import PropTypes from 'prop-types';

function MapStyleButton(props) {
  return (
    <button>
      <div className="map-toggle-container">
        <p>{props.text}</p>
        <img src={props.image} onClick={props.onClick} className="map-toggle toggle button" alt={"map toggle"} />
      </div>
    </button>
  )
}

MapStyleButton.propTypes = {
  text: PropTypes.string
};

export default MapStyleButton