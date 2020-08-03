import React from 'react'
import PropTypes from 'prop-types';
import MapStyleButton from './MapStyleButton';
import streetsMapLogo from '../images/streets.jpg'
import lightMapLogo from '../images/light.jpg'
import darkMapLogo from '../images/dark.jpg'
import satelliteMapLogo from '../images/satellite.jpg'
import nasaMapLogo from '../images/nasa.jpg'

function MapToggleControl (props) {

  const handleMapClick = () => {
    let style = props.style;
    if (style === "mapbox/streets-v11") {
      return <MapStyleButton image={streetsMapLogo} text={"streets"} onClick={handleMapClick} />
    } else if (style === "mapbox/light-v10") {
      return <MapStyleButton image={lightMapLogo} text={"light"} onClick={handleMapClick} />
    } else if (style === "mapbox/dark-v10") {
      return <MapStyleButton image={darkMapLogo} text={"dark"} onClick={handleMapClick} />
    } else if (style === "mapbox/satellite-v9") {
      return <MapStyleButton image={satelliteMapLogo} text={"satellite"} onClick={handleMapClick} />
    } else if (style === "babslabs/ckdeqivtw58yu1io86gzqy7ie") {
      return <MapStyleButton image={nasaMapLogo} text={"NASA"} onClick={handleMapClick} />
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