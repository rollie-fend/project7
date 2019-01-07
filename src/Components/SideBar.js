import React, { Component } from 'react';
import '../App.css';

export class SideBar extends Component {
  render() {
/* The side navigation menu 
code is mainly based on https://www.w3schools.com/howto/howto_js_sidenav.asp */

/* Set the width of the side navigation to 250px */
    var openNav=()=> {
      document.getElementById("mapSidebar").style.width = "250px";
    }

/* Set the width of the side navigation to 0 */
/* At this point, button group below are just placeholders */
    var closeNav=()=> {
      document.getElementById("mapSidebar").style.width = "0";
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
          <div className="buttonGrp">
            <button type="button">Alpha</button>
            <button type="button">Bravo</button>
            <button type="button">Charlie</button>
            <button type="button">Delta</button>
          </div>
        </div>
      </div>
    );
  }
}

export default SideBar