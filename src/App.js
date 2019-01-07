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
    places: locdata,
    filtered: null,
    selectedIndex: null
  }
  style ={
    mapDim: {
      width: 100,
      height: 100
    },
    header: {
      marginTop: '0'
    }
  };

  componentDidMount() {
    this.setState({
      filtered: this.filterPlaces(this.state.places,"")
    });
  }
   searchKey = (query) => {
      this.setState({
      filtered: this.filterPlaces(this.state.places, query)
    });
  }

  filterPlaces = (places, query) => {
    return places.filter(places => places.name.toLowerCase().includes(query.toLowerCase()));
  }

  clickedVenue = (index) => {
    this.setState({ selectedIndex: index})
  }

  render() {
    return (
      <MapPage
        initialCenter={this.state.initialCenter}
        zoom={this.state.zoom}
        style={this.style}
        places={this.state.filtered}
        selectedIndex={this.state.selectedIndex}
        searchKey={this.searchKey}
        clickedVenue={this.clickedVenue}
        filterPlaces={this.filterPlaces} 
      />
    );
  }
}

export default App;
