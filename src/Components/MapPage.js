import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';
import '../App.css'
import SideBar from './SideBar'

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlace: null,
      activeMarker: null,
      showingInfoWindow: false,
      map: null,
      markers: [],
      markerObjects: []
    };
  }

  onMarkerClick = (props, marker, e) => {
    this.closeInfoWindow();
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  markedMap = (props, map) => {
    this.setState({map});
    this.addMarker(this.props.places);
  }

  closeInfoWindow = () => {
    this.state.activeMarker && this.state.activeMarker.setAnimation(null);
    this.setState({showingInfoWindow: false, activeMarker: null, selectedPlace: null});
  }

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
    }
  };

  addMarker = (places) => {
  // Check for completion  
    if (!places) 
      return;
    this.state.markers.forEach(marker => marker.setMap(null));
  // Loop to add markers and create marker objects
    let markerObjects = [];
    let markers = places.map((places, index) => {
      let placesProps = {
        key: index,
        index: index,
        name: places.name,
        position: places.pos,
        url: places.url,
        street: places.street
      };
      markerObjects.push(placesProps);
      let animation = this.props.google.maps.Animation.DROP;
      let marker = new this.props.google.maps.Marker({
        position: places.pos, 
        map: this.state.map, 
        animation
      });
      marker.addListener('click', () => {
        this.onMarkerClick(placesProps, marker, null);
      });
      return marker;
    })
    this.setState({markers, markerObjects});
  }

  render() {
    let selPl = this.state.selectedPlace;
    console.log('this.props', this.props);
    console.log('this.state', this.state);
    return (
      <div>
        <Map google={this.props.google} 
          initialCenter={this.props.initialCenter}
          onReady={this.markedMap}
          zoom={this.props.zoom}
          style={this.style}
          role='application'
          aria-label='map'
          onClick={this.closeInfoWindow}>
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.closeInfoWindow}>
            <div>
              <h3>{selPl && selPl.name}</h3>
              <p>{selPl && selPl.street}</p>
              {selPl && selPl.url?(<a href={selPl.url}>Go to website</a>): ""}
            </div>
          </InfoWindow>
        </Map>
        <SideBar/>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBMrOY3Jca5wPn7H06AucRAieTIUrq-gUU"
})(MapContainer)
