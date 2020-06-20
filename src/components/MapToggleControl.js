import React from 'react'
import PropTypes from 'prop-types';
import MapStyleButton from './MapStyleButton';
import streetsLogo from '../images/streets.jpg'
import lightLogo from '../images/light.jpg'
import darkLogo from '../images/dark.jpg'
import satelliteLogo from '../images/satellite.jpg'

function MapToggleControl (props) {

  const handleMapClick = () => {
    let style = props.style;
    if (style === "streets-v11") {
      return <MapStyleButton image={streetsLogo} text={"streets"} onClick={handleMapClick} />
    } else if (style === "light-v10") {
      return <MapStyleButton image={lightLogo} text={"light"} onClick={handleMapClick} />
    } else if (style === "dark-v10") {
      return <MapStyleButton image={darkLogo} text={"dark"} onClick={handleMapClick} />
    } else if (style === "satellite-v9") {
      return <MapStyleButton image={satelliteLogo} text={"satellite"} onClick={handleMapClick} />
    }
  }

  return (
    <div>
      {handleMapClick()}
    </div>
  )
}

MapToggleControl.propTypes = {
  name: PropTypes.string
};

export default MapToggleControl