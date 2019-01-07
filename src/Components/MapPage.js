import {Map, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';

export class MapContainer extends Component {
  render() {
    return (
      <Map google={this.props.google} 
        initialCenter={this.props.initialCenter}
        zoom={this.props.zoom}
        style={this.style}
      />
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: "AIzaSyBMrOY3Jca5wPn7H06AucRAieTIUrq-gUU"
})(MapContainer)