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

    map.on('load', function () {
      axiosService().then(function (result) {
        map.flyTo({ center: [result.data.longitude, result.data.latitude] });
      })
    });

    this.loadData(map);

    setInterval(() => {
      this.loadData(map)
      this.deletePopups(map)
      this.deleteMarkers(map)
    }, 30000);
  }

  loadData(map) {
    axiosService().then(function (result) {
      var el = document.createElement('div');
      el.className = 'marker';

      new mapboxgl.Marker(el)
        .setLngLat([result.data.longitude, result.data.latitude])
        .addTo(map)

        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(`
            <h3> International Space Station (ISS) </h3>
            <p> Latitude: ${result.data.latitude} </p>
            <p> Longitude: ${result.data.longitude} </p>
            <p> Altitude: ${result.data.altitude + " " + result.data.units} </p>
            <p> Velocity: ${result.data.velocity + " " + result.data.units + " per hour"} </p>
            `))
        .addTo(map);
    })
  }

  deleteMarkers(map) {
    var el = document.getElementsByClassName("marker mapboxgl-marker mapboxgl-marker-anchor-center");

    for (var i = el.length - 1; i >= 0; --i) {
      el[i].remove();
    }
  }

  deletePopups(map) {
    var el = document.getElementsByClassName("mapboxgl-popup");

    for (var i = el.length - 1; i >= 0; --i) {
      el[i].remove();
    }
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