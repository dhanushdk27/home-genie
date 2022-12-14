import logo from './logo.svg';
import './App.css';
import { Row, Col } from "reactstrap";
import Home from './HomeAllComponents.js/home';
import { useState, useEffect } from 'react';
import axios from "axios";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Details from './Detailes/Details';





function App() {
  const [locationData, setLocationData] = useState([]);
  const [locationObject, setLocationObject] = useState({})
  const getMapData = async () => {
    let getData = await axios.get("https://rcz-backend-arvinth.herokuapp.com/api/mapData", {
      params: {
        latitude: locationData[0],
        longitude: locationData[1]
      }


    });
    setLocationObject(await getData.data);
  }


  useEffect(() => {
    if (locationData.length > 0) { getMapData(); }


  }, [locationData])
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  function showPosition(position) {
    setLocationData([position.coords.latitude, position.coords.longitude]);
  }
  useEffect(() => {
    getLocation();

  }, [])
  return (
    <Router>
      <div className="App" >
        <Switch>
          <Route path="/home" exact>
            <Home loctionFromApp={locationObject} />
          </Route>

          <Route path="/details/:id" exact>
           <Details/>
          </Route>
        </Switch>
        {/* {locationData} */}
      </div>
    </Router>
  );
}

export default App;
