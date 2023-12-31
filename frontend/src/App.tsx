import Map from "./components/Map/Map";
import Navbar from './components/Navbar';
import "./App.css";
import { useEffect, useState } from "react";
import { FeatureCollection } from "geojson";
import { IWeb3Context, useWeb3Context } from "./context/Web3Context";
import useEarthBalance from "./hooks/useEarthBalance";

const countriesPath = require("./countries.geojson");

function App() {
  const [ countriesGeoJson, setCountriesGeoJson ] = useState<FeatureCollection | undefined>({features: []})
  const earthBalance = useEarthBalance();
  const {
    connectWallet,
    disconnect,
    state: { isAuthenticated, address },
  } = useWeb3Context() as IWeb3Context;

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
      <Navbar
        title="Earthereum"
        isAuthenticated={isAuthenticated}
        currentAccount={address}
        earthBalance={earthBalance}
        onClickConnect={connectWallet}
        onClickDisConnect={disconnect}
      ></Navbar>
      <Map countriesGeoJSON={countriesGeoJson}></Map>
    </>
  )
}

export default App;
