import React, { Component } from 'react';
import MapPage from './Components/MapPage';
import locdata from './locdata.json'

class App extends Component {

  state={
    initialCenter: {  // Keller TX by default
      lat: 32.927533,
      lng: -97.235995 
    },
    zoom: 13,
    places: locdata
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
        places={this.state.places}
      />
    );
  }
}

export default App;
