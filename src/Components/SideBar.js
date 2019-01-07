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
      document.getElementById("mapSidebar").tabIndex="0";
      document.getElementById("openbtn").hidden=true;
      document.getElementById("openbtn").tabIndex="0";
      document.getElementById("closebtn").hidden=false;
      document.getElementById("closebtn").tabIndex="-1";
      document.getElementById("mapSidebar").hidden=false;
      document.getElementById("closebtn").focus();
    }

/* Set the width of the side navigation to 0 */

    var closeNav=()=> {
      document.getElementById("mapSidebar").style.width = "-1";
      this.setState({open: false});
      document.getElementById("mapSidebar").tabIndex="-1";
      document.getElementById("closebtn").hidden=true;
      document.getElementById("openbtn").hidden=false;
      document.getElementById("closebtn").tabIndex="0";
      document.getElementById("openbtn").tabIndex="-1";
      document.getElementById("mapSidebar").hidden=true;
      document.getElementById("openbtn").focus();
    }
/*    switchFocus = (index) => {

    }*/
    return (
      <div>
        <div>
          <span id="openbtn"  role='button'  aria-label='open sidebar'
            onClick={openNav} onKeyPress={openNav}>  Keller,  Texas   Restaurants   &#9776;
          </span>
        </div>
        <div id="mapSidebar" className="sidebar" role='navigation' tabIndex="-1" aria-label="sidebar">
          <span id="closebtn" role='button' aria-label='close sidebar' tabIndex="-1" 
            style={{color: 'white', cursor: 'pointer'}} 
            onClick={closeNav} onKeyPress={closeNav}>  Keller,  Texas   Restaurants   &times;
          </span>
          <input id="filter" tabIndex="0"
            type="text"
            aria-label='filter locations'
            placeholder="Filter list"
            onChange={e => this
              .searchKey(e.target.value)}
              value={this.state.query} />
          <ul id="buttonGrp" tabIndex="0 ">
            {this.props.places && this
              .props
              .places
              .map((places, index) => {
              return (
                <li key={index}>
                  <button key={index} tabIndex="0" onClick={e => this.props.clickedVenue(index)}>
                  <b>{places.name}</b></button>
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