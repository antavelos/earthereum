import Map from "./components/Map/Map";
import Navbar from './components/Navbar';
import "./App.css";
import { useEffect, useState } from "react";
import { FeatureCollection } from "geojson";

const countriesPath = require("./countries.geojson");

function App() {
  const [ countriesGeoJson, setCountriesGeoJson ] = useState<FeatureCollection | undefined>({features: []})

  const loadGeoJsonData = () => {
    fetch(countriesPath)
      .then(response => {
        return response.json();
      }).then(data => {
        setCountriesGeoJson(data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  useEffect(loadGeoJsonData, []);

  return (
    <>
      <Navbar></Navbar>
      <Map countriesGeoJSON={countriesGeoJson}></Map>
    </>
  )
}

export default App;
