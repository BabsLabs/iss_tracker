import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import FollowControl from './FollowControl'
import MarkerToggleControl from './MarkerToggleControl';
import MapToggleControl from './MapToggleControl';
import InstructionPopup from './InstructionPopup';
require('dotenv').config();

mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`;

class Mapbox extends Component {
  mapRef = React.createRef();
  map;

  constructor(props) {
    super(props);
    this.state = {
      lng: 104.9903,
      lat: 39.7392,
      zoom: 3,
      issLat: null,
      issLong: null,
      issAltitude: null,
      issVelocity: null,
      issUnits: null,
      follow: true,
      observatoriesToggled: true,
      eventsToggled: true,
      mapStyles: ["streets-v11", "light-v10","dark-v10", "satellite-v9"],
      mapStyleIndex: 1,
      showPopup: false
    };
    this.toggleFollow = this.toggleFollow.bind(this);
    this.toggleObservatories = this.toggleObservatories.bind(this);
    this.toggleEvents = this.toggleEvents.bind(this);
    this.toggleMap = this.toggleMap.bind(this);
    this.toggleInstructions = this.toggleInstructions.bind(this);
    this.issService = this.issService.bind(this);
  }

  issService() {
    const url = `https://babslabs-iss-tracker-backend.herokuapp.com/iss`;
    return (
      axios.get(url, { headers: { "SUPER_SECRET_TOKEN": `${process.env.REACT_APP_SUPER_SECRET_TOKEN}`} })
      .then(result => {
        this.setState({
          issLong: result.data.data.IssLocation.longitude,
          issLat: result.data.data.IssLocation.latitude,
          issAltitude: result.data.data.IssLocation.altitude,
          issVelocity: result.data.data.IssLocation.velocity,
          issUnits: result.data.data.IssLocation.units,
        })
      })
    )
  }

  nasaEventsService = () => {
    const url = 'https://babslabs-iss-tracker-backend.herokuapp.com/events';
    return (
      axios.get(url, { headers: { "SUPER_SECRET_TOKEN": `${process.env.REACT_APP_SUPER_SECRET_TOKEN}` } })
        .then(events => { return events })
    )
  }

  observatoryService = () => {
    const url = `https://babslabs-iss-tracker-backend.herokuapp.com/observatories`;
    return (
      axios.get(url, { headers: { "SUPER_SECRET_TOKEN": `${process.env.REACT_APP_SUPER_SECRET_TOKEN}` } })
        .then(observatories => { return observatories })
    )
  }


  toggleFollow() {
    const currentFollowState = this.state.follow;
    this.setState({ follow: !currentFollowState}, this.checkMapCenter())
  }

  checkMapCenter() {
    const following = this.state.follow;
    if (!following) {
      this.centerMap()
    }
  }

  centerMap() {
    this.map.flyTo({ center: [this.state.issLong, this.state.issLat], zoom: this.state.zoom})
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

  toggleMap = (map) => {
    let currentMapStyleIndex = this.state.mapStyleIndex;
    this.map.setStyle(`mapbox://styles/mapbox/${this.state.mapStyles[this.state.mapStyleIndex]}`);
    if (this.state.mapStyleIndex >= 3) {
      this.setState({ mapStyleIndex: 0})
    } else {
      this.setState({ mapStyleIndex: currentMapStyleIndex += 1 })
    }
  }

  toggleInstructions = () => {
    this.setState({
      showPopup: !this.state.showPopup
    })
  }
  
  componentDidMount() {
    this.toggleInstructions();
    this.issService()
    
    this.map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
      maxzoom: 9,
      attributionControl: false
    });
    
    const mapboxMap = this.map
    const issElement = document.createElement('div');
    issElement.className = 'iss-marker marker';
    const issMarker = new mapboxgl.Marker(issElement);
    const issPopup = new mapboxgl.Popup({ offset: 25 });
    
    const mapNav =  new mapboxgl.NavigationControl();
    mapboxMap.addControl(mapNav, 'bottom-right');

    mapboxMap.on('load', () => {
      
      this.issService().then( (result) => {
      
        issMarker.setLngLat([
          this.state.issLong,
          this.state.issLat])
          .addTo(mapboxMap);
        
        issMarker.setPopup(issPopup.setHTML(`
        <h3>International Space Station (ISS)</h3>
        <p>Latitude: ${this.state.issLat}</p>
        <p>Longitude: ${this.state.issLong}</p>
        <p>Altitude: ${this.state.issAltitude + " " + this.state.issUnits}</p>
        <p>Velocity: ${this.state.issVelocity + " " + this.state.issUnits + " per hour"}</p>
        `))
          .addTo(mapboxMap);
        
          this.centerMap(mapboxMap)
      });  
    });
    
    this.observatoryService().then(function (result) {
      const observatories = result.data.data.NasaObservatories;
      
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

    this.nasaEventsService().then(function (result) {
      let allEvents = result.data.data.NasaEvents;

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
              <p>Latitude: ${event.geometry.coordinates[1]}</p>
              <p>Longitude: ${event.geometry.coordinates[0]}</p>
              <a href="${event.properties.sources[0].url}" >More Info</a>
              `))
            .addTo(mapboxMap)
      })
    })

    mapboxMap.on('move', () => {
      this.setState({
        zoom: mapboxMap.getZoom().toFixed(2)
      });
    });
    
    setInterval(() => {
      const checkForPopup = issPopup.isOpen()
      const checkForFollow = this.state.follow;
      
      this.issService().then((res) => {
        issMarker.setLngLat([
          this.state.issLong,
          this.state.issLat
        ])
          .addTo(mapboxMap);
        
        if (checkForPopup === true) {
          issPopup.setHTML(`
          <h3> International Space Station (ISS) </h3>
          <p> Latitude: ${this.state.issLat} </p>
          <p> Longitude: ${this.state.issLong} </p>
          <p> Altitude: ${this.state.issAltitude + " " + this.state.issUnits} </p>
          <p> Velocity: ${this.state.issVelocity + " " + this.state.issUnits + " per hour"} </p>
          `)
          .addTo(mapboxMap)
        };
        
        if (checkForFollow === true) {
          this.centerMap();
        };
      })
    }, 3000);
    
  };

  render() {
    return (
      <div>
        <div onClick={this.toggleInstructions}>
          {this.state.showPopup ?
            <InstructionPopup
              closePopup={this.togglePopup}
            />
            : null
          } 
          <MarkerToggleControl name={"Instructions"} />
        </div>
        <div onClick={this.toggleMap}>
          <MapToggleControl name={"Map"} style={`${this.state.mapStyles[this.state.mapStyleIndex]}`}/>
        </div>
        <div onClick={this.toggleEvents}>
          <MarkerToggleControl name={"Events"} />
        </div>
        <div onClick={this.toggleObservatories}>
          <MarkerToggleControl name={"Observatories"} />
        </div>
        <div onClick={this.toggleFollow}>
          <FollowControl />
        </div>
        <div ref={this.mapRef} className="mapContainer" />
      </div>
    )
  }

}

export default Mapbox