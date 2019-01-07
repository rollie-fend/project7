import {Map, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';
import '../App.css'
import SideBar from './SideBar'

export class MapContainer extends Component {
  render() {
    return(
      <div>
        <Map google={this.props.google}
          initialCenter={this.props.initialCenter}
          zoom={this.props.zoom}
          style={this.style}
          role='application'
          aria-label='map'
        />
        <SideBar/>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBMrOY3Jca5wPn7H06AucRAieTIUrq-gUU"
})(MapContainer)