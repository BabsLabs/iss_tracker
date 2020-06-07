import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
require('dotenv').config();

mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`;

class Mapbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 1,
      issLat: null,
      issLong: null
    };
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });

    this.loadData(map);

    setInterval(() => {
      this.deleteMarkers(map)
      this.deletePopups(map)
      this.loadData(map)
    }, 30000);
  }

  loadData(map) {

    axios.get(`http://api.open-notify.org/iss-now.json`)
      .then(res => {
        const lat = res.data.iss_position.latitude
        const long = res.data.iss_position.longitude
        this.setState({
          issLat: lat,
          issLong: long
        })

        var el = document.createElement('div');
        el.className = 'marker';

        new mapboxgl.Marker(el)
          .setLngLat([this.state.issLong, this.state.issLat])
          .addTo(map)

        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(`<h3> International Space Station (ISS) </h3><p> Latitude: ${this.state.issLat} </p><p> Longitude: ${this.state.issLong} </p>`))
          .addTo(map);

      })
    }

  deleteMarkers(map) {
    var el = document.getElementsByClassName("marker mapboxgl-marker mapboxgl-marker-anchor-center");
    console.log(el)

    for (var i = el.length - 1; i >= 0; --i) {
      el[i].remove();
    }

  }

  deletePopups(map) {
    var el = document.getElementsByClassName("mapboxgl-popup");
    console.log(el)

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