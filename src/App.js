import React, { Component } from 'react';
import MapPage from './Components/MapPage';

class App extends Component {
  state={
    initialCenter: {  // Keller TX by default
      lat: 32.927533,
      lng: -97.235995
    },
    zoom: 13,
  }
  style ={
    mapDim: {
      width: 100,
      height: 100
    },
    header: {
      marginTop: 0
    }
  };

  render() {
    return (
      <MapPage
        initialCenter={this.state.initialCenter}
        zoom={this.state.zoom}
        style={this.style}
      />
    );
  }
}

export default App;

