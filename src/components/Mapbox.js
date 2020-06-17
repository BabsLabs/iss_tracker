import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import FollowControl from './FollowControl'
import observatoryLogo from '../images/observatory.png'
require('dotenv').config();

const issService = () => {
  return (
    axios.get(`https://api.wheretheiss.at/v1/satellites/25544`)
    .then(issInfo => { return issInfo })
  )
}

const observatoryService = () => {
  return (
    axios.get(`https://sscweb.sci.gsfc.nasa.gov/WS/sscr/2/groundStations`)
      .then(observatories => { return observatories})
  )
}

mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`;

class Mapbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 1,
      follow: false,
      observatoriesToggled: true
    };
    this.toggleFollow = this.toggleFollow.bind(this);
    this.toggleObservatories = this.toggleObservatories.bind(this);
  }

  toggleFollow() {
    const currentFollowState = this.state.follow;
    this.setState({ follow: !currentFollowState });
  }

  toggleObservatories() {
    const currentObservatoryState = this.state.observatoriesToggled;
    this.setState({ observatoriesToggled: !currentObservatoryState });

    const observatoryMarkers = document.querySelectorAll(".observatory-marker");
    if (currentObservatoryState === true) {
      for (var i = 0; i < observatoryMarkers.length; i++) {
        observatoryMarkers[i].style.visibility = "hidden";
      }
    } else {
      for (var q = 0; q < observatoryMarkers.length; q++) {
        observatoryMarkers[q].style.visibility = "visible";
      }
    }

    const observatoryPopups = document.querySelectorAll(".observatory-popup");
    if (currentObservatoryState === true) {
      for (var j = 0; j < observatoryPopups.length; j++) {
        observatoryPopups[j].style.visibility = "hidden";
      }
    } else {
      for (var k = 0; k < observatoryPopups.length; k++) {
        observatoryPopups[k].style.visibility = "visible";
      }
    }
  }
  
  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });
    
    const issElement = document.createElement('div');
    issElement.className = 'iss-marker';
    const issMarker = new mapboxgl.Marker(issElement);
    const issPopup = new mapboxgl.Popup({ offset: 25 });

    map.on('load', function () {
      
      issService().then(function (result) {
        issMarker.setLngLat([
          result.data.longitude,
          result.data.latitude
        ]).addTo(map);


        issMarker.setPopup(issPopup.setHTML(`
          <h3>International Space Station (ISS)</h3>
          <p>Latitude: ${result.data.latitude}</p>
          <p>Longitude: ${result.data.longitude}</p>
          <p>Altitude: ${result.data.altitude + " " + result.data.units}</p>
          <p>Velocity: ${result.data.velocity + " " + result.data.units + " per hour"}</p>
          `))
          .addTo(map);

        map.flyTo({ center: [result.data.longitude, result.data.latitude] });
      });  
    })

    observatoryService().then(function (result) {
      const observatories = result.data.GroundStation[1];

      observatories.forEach(function (marker) {

        const observatoryElement = document.createElement('div');
        observatoryElement.className = 'observatory-marker';

        new mapboxgl.Marker(observatoryElement)
          .setLngLat([marker.Location.Longitude, marker.Location.Latitude])
          .addTo(map)

          .setPopup(new mapboxgl.Popup({ offset: 25, className: 'observatory-popup' })
            .setHTML(`
            <h3> ${marker.Id} Observatory </h3>
            <p>Latitude: ${marker.Location.Latitude}</p>
            <p>Longitude: ${marker.Location.Longitude}</p>
            `))
            .addTo(map)
        })
      })
    
    setInterval(() => {
      const checkForPopup = issPopup.isOpen()
      const checkForFollow = this.state.follow;
      
      issService().then(function (res){
        issMarker.setLngLat([
          res.data.longitude,
          res.data.latitude
        ])
        .addTo(map);
        
        if (checkForPopup === true) {
          issPopup.setHTML(`
          <h3> International Space Station (ISS) </h3>
          <p> Latitude: ${res.data.latitude} </p>
          <p> Longitude: ${res.data.longitude} </p>
          <p> Altitude: ${res.data.altitude + " " + res.data.units} </p>
          <p> Velocity: ${res.data.velocity + " " + res.data.units + " per hour"} </p>
          `)
          .addTo(map)
        };
        
        if (checkForFollow === true) {
          map.flyTo({ center: [res.data.longitude, res.data.latitude], zoom: 3 });
        };
      })
    }, 3000);
    
  };

  observatoryService = () => {
    axios.get(`https://sscweb.sci.gsfc.nasa.gov/WS/sscr/2/groundStations`)
      .then(observatories => {
        this.setState({
          observatories: observatories.data.GroundStation[1]
        });
      });
  };

  render() {
    return (
      <div>
        {/* <nav id='menu'></nav> */}
        <img src={observatoryLogo} id="observatory-toggle" onClick={this.toggleObservatories} alt="observatory toggle button" ></img>
        <div onClick={this.toggleFollow}>
          <FollowControl/>
        </div>
        <div ref={issElement => this.mapContainer = issElement} className="mapContainer" />
      </div>
    )
  }

}

export default Mapbox