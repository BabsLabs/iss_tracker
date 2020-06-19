import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import FollowControl from './FollowControl'
import MarkerToggleControl from './MarkerToggleControl';

require('dotenv').config();

const issService = () => {
  return (
    axios.get(`https://api.wheretheiss.at/v1/satellites/25544`)
    // .then(issInfo => { return issInfo })
  )
}

const observatoryService = () => {
  return (
    axios.get(`https://sscweb.sci.gsfc.nasa.gov/WS/sscr/2/groundStations`)
      .then(observatories => { return observatories})
  )
}

const nasaEventsService = () => {
  return (
    axios.get('https://eonet.sci.gsfc.nasa.gov/api/v3/events/geojson?status=open')
    .then(events => { return events })
  )
}

mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`;

class Mapbox extends Component {
  mapRef = React.createRef();
  map;

  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 1,
      follow: true,
      observatoriesToggled: true,
      eventsToggled: true,
      mapStyles: ["streets-v11", "light-v10","dark-v10", "satellite-v9"],
      mapStyleIndex: 1
    };
    this.toggleFollow = this.toggleFollow.bind(this);
    this.toggleObservatories = this.toggleObservatories.bind(this);
    this.toggleEvents = this.toggleEvents.bind(this);
    this.toggleMap = this.toggleMap.bind(this);
  }

  toggleFollow() {
    const currentFollowState = this.state.follow;
    this.setState({ follow: !currentFollowState });
  }

  toggleObservatories() {
    const currentObservatoryState = this.state.observatoriesToggled;
    this.setState({ observatoriesToggled: !currentObservatoryState }, this.clearMarkersAndPopups('observatory', this.state.observatoriesToggled));
  }
  
  toggleEvents() {
    const currentEventState = this.state.eventsToggled
    this.setState({ eventsToggled: !currentEventState }, this.clearMarkersAndPopups('event', this.state.eventsToggled));
  }

  clearMarkersAndPopups = (toggledItem, toggledState) => {
    const currentToggleState = toggledState;
    
    const markers = document.querySelectorAll(`.${toggledItem}-marker`);
    if (currentToggleState === true) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].style.visibility = "hidden";
      }
    } else {
      for (var q = 0; q < markers.length; q++) {
        markers[q].style.visibility = "visible";
      }
    }

    const popups = document.querySelectorAll(`.${toggledItem}-popup`);
    if (currentToggleState === true) {
      for (var j = 0; j < popups.length; j++) {
        popups[j].style.visibility = "hidden";
      }
    } else {
      for (var k = 0; k < popups.length; k++) {
        popups[k].style.visibility = "visible";
      }
    }
  }

  filterEvents = events => {
    return events.filter(event => {
      return event.geometry.type === "Point";
    });
  };

  toggleMap = (map) => {
    let currentMapStyleIndex = this.state.mapStyleIndex;
    this.map.setStyle(`mapbox://styles/mapbox/${this.state.mapStyles[this.state.mapStyleIndex]}`);
    if (this.state.mapStyleIndex >= 3) {
      this.setState({ mapStyleIndex: 0})
    } else {
      this.setState({ mapStyleIndex: currentMapStyleIndex += 1 })
    }
  }
  
  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
      maxzoom: 9,
    });
    
    const mapboxMap = this.map
    const issElement = document.createElement('div');
    issElement.className = 'iss-marker marker';
    const issMarker = new mapboxgl.Marker(issElement);
    const issPopup = new mapboxgl.Popup({ offset: 25 });
    
    
    this.map.on('load', function () {
      
      issService().then(function (result) {
        issMarker.setLngLat([
          result.data.longitude,
          result.data.latitude])
          .addTo(mapboxMap);
        
        issMarker.setPopup(issPopup.setHTML(`
        <h3>International Space Station (ISS)</h3>
        <p>Latitude: ${result.data.latitude}</p>
        <p>Longitude: ${result.data.longitude}</p>
        <p>Altitude: ${result.data.altitude + " " + result.data.units}</p>
        <p>Velocity: ${result.data.velocity + " " + result.data.units + " per hour"}</p>
        `))
          .addTo(mapboxMap);
        
        mapboxMap.flyTo({ center: [result.data.longitude, result.data.latitude] });
      });  
    });
    
    observatoryService().then(function (result) {
      const observatories = result.data.GroundStation[1];
      
      observatories.forEach(function (marker) {
        
        const observatoryElement = document.createElement('div');
        observatoryElement.className = 'observatory-marker marker';

        new mapboxgl.Marker(observatoryElement)
          .setLngLat([marker.Location.Longitude, marker.Location.Latitude])
          .addTo(mapboxMap)

          .setPopup(new mapboxgl.Popup({ offset: 25, className: 'observatory-popup' })
            .setHTML(`
            <h3> ${marker.Id} Observatory </h3>
            <p>Latitude: ${marker.Location.Latitude}</p>
            <p>Longitude: ${marker.Location.Longitude}</p>
            `))
            .addTo(mapboxMap)
        })
      });

    nasaEventsService().then(function (result) {
      let allEvents = result.data.features;

      const goodEvents = allEvents.filter(function (item) {
        return item.geometry.type === "Point";
      });
      
      goodEvents.forEach(function (event) {

          let nasaEventElement = document.createElement('div');
          nasaEventElement.className = 'event-marker marker';

          new mapboxgl.Marker(nasaEventElement)
            .setLngLat({ lng: event.geometry.coordinates[0], lat: event.geometry.coordinates[1]})
            .addTo(mapboxMap)

            .setPopup(new mapboxgl.Popup({ offset: 25, className: 'event-popup' })
              .setHTML(`
              <h3> ${event.properties.title}</h3>
              <h4> ${event.properties.categories[0].title}</h4>
              <p>Latitude: ${event.geometry.coordinates[0]}</p>
              <p>Longitude: ${event.geometry.coordinates[1]}</p>
              <a href="${event.properties.sources[0].url}" >More Info</a>
              `))
            .addTo(mapboxMap)
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
          .addTo(mapboxMap);
        
        if (checkForPopup === true) {
          issPopup.setHTML(`
          <h3> International Space Station (ISS) </h3>
          <p> Latitude: ${res.data.latitude} </p>
          <p> Longitude: ${res.data.longitude} </p>
          <p> Altitude: ${res.data.altitude + " " + res.data.units} </p>
          <p> Velocity: ${res.data.velocity + " " + res.data.units + " per hour"} </p>
          `)
          .addTo(mapboxMap)
        };
        
        if (checkForFollow === true) {
          mapboxMap.flyTo({ center: [res.data.longitude, res.data.latitude], zoom: 3 });
        };
      })
    }, 3000);
    
  };

  render() {
    return (
      <div>
        <div onClick={this.toggleMap}>
          <MarkerToggleControl name={"Map"} />
        </div>
        <div onClick={this.toggleEvents}>
          <MarkerToggleControl name={"Events"} />
        </div>
        <div onClick={this.toggleObservatories}>
          <MarkerToggleControl name={"Observatories"} />
        </div>
        <div onClick={this.toggleFollow}>
          <FollowControl/>
        </div>
        <div ref={this.mapRef} className="mapContainer" />
      </div>
    )
  }

}

export default Mapbox