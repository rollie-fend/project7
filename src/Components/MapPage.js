import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';
import '../App.css'
import SideBar from './SideBar'
import NoMap from './NoMap'

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlace: null,
      activeMarker: null,
      showingInfoWindow: false,
      map: null,
      markers: [],
      markerObjects: [],
    };
  }

  componentWillReceiveProps = (props) => {
    if (this.state.markers.length !== props.places.length) {
      this.addMarker(props.places);
      this.setState({activeMarker: null});
      this.closeInfoWindow();
      return;
    }
    if (!props.selectedIndex || (this.state.activeMarker && 
      (this.state.markers[props.selectedIndex] !== this.state.activeMarker))) {
        this.closeInfoWindow();
    }
    if (props.selectedIndex === null || typeof(props.selectedIndex) === "undefined") {
      return;
    };
    this.onMarkerClick(this.state.markerObjects[props.selectedIndex], this.state.markers[props.selectedIndex]);    
  }

  onMarkerClick = (props, marker, e) => {
    this.closeInfoWindow();
    // FourSquare data request for the selected place
    let fsInfo = `https://api.foursquare.com/v2/venues/search?client_id=${'XCMLSRFFMTKU5EL2CSNPRQX1T2SV1QOEEQ4HQ5QEDHXDYNZ3'}&client_secret=${'ZJRXLVVLFQSAQZG3NI4UU22CDZ0ZQ0D3MQWBNBRLSWXSHK50'}&v=${'20180323'}&radius=100&ll=${props.position.lat},${props.position.lng}&llAcc=100`;
    let headers = new Headers();
    let request = new Request(fsInfo, {
      method: 'GET',
      headers
    });
    let selectedPlace;
    fetch(request)
      .then(response => response.json())
      .then(result => {
        let FSvenue = this.getFSdata(props, result);
        selectedPlace = {
          ...props,
          fsData: FSvenue[0]
        };

    // From Foursquare data, get list of photos for selected place
       if (selectedPlace.fsData) {
          let fsInfo = `https://api.foursquare.com/v2/venues/${FSvenue[0].id}/photos?client_id=${'XCMLSRFFMTKU5EL2CSNPRQX1T2SV1QOEEQ4HQ5QEDHXDYNZ3'}&client_secret=${'ZJRXLVVLFQSAQZG3NI4UU22CDZ0ZQ0D3MQWBNBRLSWXSHK50'}&v=${'20180323'}`;
          fetch(fsInfo)
            .then(response => response.json())
            .then(result => {
              selectedPlace = {
              ...selectedPlace,
              photo: result.response.photos
              };
              if (this.state.activeMarker) 
                this.state.activeMarker.setAnimation(null);
                marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
                this.setState({
                  selectedPlace,
                  activeMarker: marker,
                  showingInfoWindow: true});
            })
        } else {
          marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
          this.setState({
            selectedPlace,
            activeMarker: marker,
            showingInfoWindow: true
          });
        }
    })
  }

  markedMap = (props, map) => {
    this.setState({map});
    this.addMarker(this.props.places);
  }

  closeInfoWindow = () => {
    this.state.activeMarker && this.state.activeMarker.setAnimation(null);
    this.setState({selectedPlace: null, activeMarker: null, showingInfoWindow: false});
  }

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
    }
  };
  getFSdata = (props, data) => {
    return data.response.venues.filter(item => item.name.includes(props.name) || props.name.includes(item.name));
  }

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
        street: places.street,
        fsInfo: places.fsInfo
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
    return (
      <div className='App' tabIndex="0">
        <Map google={this.props.google} 
          initialCenter={this.props.initialCenter}
          onReady={this.markedMap}
          zoom={this.props.zoom}
          style={this.style}
          role='application'
          aria-label='map of Keller City, Texas'
          onClick={this.closeInfoWindow}>
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.closeInfoWindow}>
            <div>
              <h3>{selPl && selPl.name}</h3>
              <p>{selPl && selPl.street}</p>
              {selPl && selPl.photo
                ? (
                  <div><img
                    alt={selPl.name + " food picture"}
                    src={selPl.photo.items[0].prefix + "120x120" + selPl.photo.items[0].suffix}/>
                    <p>Foursquare photo</p>
                  </div>
                  )
              : ""}
              {selPl && selPl.url?(<a href={selPl.url}>Go to website</a>): ""}
            </div>
          </InfoWindow>
        </Map>
        <SideBar places = {this.props.places} filterPlaces={this.props.searchKey} clickedVenue=
          {this.props.clickedVenue}/>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBMrOY3Jca5wPn7H06AucRAieTIUrq-gUU", LoadingContainer:NoMap
})(MapContainer)
