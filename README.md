# Project7 : Neighborhood Map (React)

Project7 [the Neighborhood Map (React) Project], a project requirement for Udacity's Front End Nanodegree Course, is a single page map application that displays a map with places of interest and lets the user filter the locations and access additional information.  For my implementation of this project, I chose some restaurants in a particular portion of the city of Keller, TX as places of interest.  The restaurants are depicted with markers on the map, and a sidebar that can be displayed/hidden provides a list view and an input text box where a user can type in to filter the list of places.  Clicking on a marker will display an infowindow that contains the name of the restaurant, its address, a website (if available), and a photo (also, if available).

This project was bootstrapped with Create React App and uses the following APIs: Google Map API, Foursquare API, and the google-maps-react component.  Project dependencies are installed with 'npm install' and the development server is started with 'npm start'. The organization of the files of the finished project is as follows:

├── node_modules (folder)

├── public

│   ├── favicon.ico # React Icon

│   ├── index.html

│   └── manifest.json

└── src

    ├── Components # React UI components
    
    │   ├── MapPage.js
    
    │   └── SideBar.js
    
    ├── App.css # Styles for the app
    
    ├── App.js # This is the root of the app
    
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is not required.
    
    ├── index.css # Global styles
    
    ├── index.js # File used for DOM rendering only
    
    ├── locdata.json # Location data for map
    
    ├── logo.svg # React logo provided with Create React App
    
    └── serviceWorker.js # service worker file provided with Create React App
    

To start building the React application, install the create-react-app package by typing the following in the command line:
 
      npx create-react-app project7
      or
      npm init react-app project7

 Follow on-screen instructions in order to create the application's configuration.  Since the google-maps-react library is also needed to build the application, download and install said library by typing the following in the command line:

      npm install --save google-maps-react

 A google maps API key and Foursquare credentials (Client ID and Client Secret) are also needed in order to use these third-party APIs in creating and running the application.  Instructions on how to do these can be found in their respective websites (https://developers.google.com/maps/documentation/javascript/get-api-key and https://developer.foursquare.com/).

 The Create React App package automatically creates a React application that can be used as the basis for developing the React Neighborhood Map project.

The finished project can be run by typing the following in the command line:

     npm start

The application wil run in a web browser with address at localhost using port 3000 as default.

Create React App also automatically creates a service worker file that can be used in the production build (but is inoperable in development).  To utilize this for offline first benefit, run the serviceworker.register() function instead of the serviceworker.unregister() funtion by editing the last line in the index,js file.  To run a production build, create first a build directory by the typing the following in the command line:

     npm run build

To create a static server, run:

     npm install -g serve
     serv -s build

The application will run from the static site using port 5000 by default. 


DISCLOSURE:

Portions of the scripts that I developed were based on those that can be found in "FEND P7 Walkthrough with Doug Brown" at https://www.youtube.com/watch?v=NVAVLCJwAAo&feature=youtu.be by Doug Brown, https://www.w3schools.com/howto/howto_js_sidenav.asp, and documentations of the google-maps-react component at https://www.npmjs.com/package/google-maps-react and https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/.
