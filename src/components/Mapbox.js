import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
require('dotenv').config();

const axiosService = () => {
  return (
    axios.get(`https://api.wheretheiss.at/v1/satellites/25544`)
    .then(issInfo => { return issInfo })
  )
}

mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`;

class Mapbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 1
    };
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });
    
    const el = document.createElement('div');
    el.className = 'marker';
    const marker = new mapboxgl.Marker(el);
    const popup = new mapboxgl.Popup({ offset: 25 });

    map.on('load', function () {
      axiosService().then(function (result) {
        marker.setLngLat([
          result.data.longitude,
          result.data.latitude
        ]).addTo(map);

        marker.setPopup(popup.setHTML(`
          <h3> International Space Station (ISS) </h3>
          <p> Latitude: ${result.data.latitude} </p>
          <p> Longitude: ${result.data.longitude} </p>
          <p> Altitude: ${result.data.altitude + " " + result.data.units} </p>
          <p> Velocity: ${result.data.velocity + " " + result.data.units + " per hour"} </p>
          `))
          .addTo(map);

        map.flyTo({ center: [result.data.longitude, result.data.latitude] });
      })
    });
    
    setInterval(() => {
      const checkForPopup = popup.isOpen()
      
      axiosService().then(function (res){
        marker.setLngLat([
          res.data.longitude,
          res.data.latitude
        ])
        .addTo(map);
        
        if (checkForPopup === true) {
          popup.setHTML(`
          <h3> International Space Station (ISS) </h3>
          <p> Latitude: ${res.data.latitude} </p>
          <p> Longitude: ${res.data.longitude} </p>
          <p> Altitude: ${res.data.altitude + " " + res.data.units} </p>
          <p> Velocity: ${res.data.velocity + " " + res.data.units + " per hour"} </p>
          `)
          .addTo(map)
        }
      })
    }, 3000);
  }
  
  render() {
    return (
      <div>
        <div ref={el => this.mapContainer = el} className="mapContainer" />
      </div>
    )
  }

}

export default Mapbox