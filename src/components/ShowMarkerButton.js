import React from 'react'
import PropTypes from 'prop-types';

function ShowMarkerButton(props) {
  let name = props.name
  return (
    <button>
      <img src={props.image} onClick={props.onClick} className={name + "-toggle toggle toggled button"} alt={name + "toggle"} />
    </button>
  )
}

ShowMarkerButton.propTypes = {
  name: PropTypes.string
};

export default ShowMarkerButton