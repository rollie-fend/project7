import React, { Component } from 'react';
import '../App.css';

export class SideBar extends Component {
  state = {
    open: false,
    query: ""
  }
  searchKey = (newQuery) => {
    this.setState({ query: newQuery });
    this.props.filterPlaces(newQuery);
  }
  render() {
/* The side navigation menu 
code is mainly based on https://www.w3schools.com/howto/howto_js_sidenav.asp */

/* Set the width of the side navigation to 250px */
    var openNav=()=> {
      document.getElementById("mapSidebar").style.width = "250px";
      this.setState({open: true});      
    }

/* Set the width of the side navigation to 0 */

    var closeNav=()=> {
      document.getElementById("mapSidebar").style.width = "0";
      this.setState({open: false})      
    }
    return (
      <div>
        <div>
          <span className="openbtn" 
            onClick={openNav}>  Keller,  Texas   Restaurants   &#9776;
            </span>
        </div>
        <div id="mapSidebar" className="sidebar">
          <span className="closebtn" 
            style={{color: 'white', cursor: 'pointer'}} 
            onClick={closeNav}>  Keller,  Texas   Restaurants   &times;
          </span>
          <input className="filter"
            type="text"
            placeholder="Filter list"
            onChange={e => this
              .searchKey(e.target.value)}
              value={this.state.query} />
          <ul className="buttonGrp">
            {this.props.places && this
              .props
              .places
              .map((places, index) => {
              return (
                <li key={index}>
                  <button key={index} onClick={e => this.props.clickedVenue(index)}><b>{places.name}</b></button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default SideBar