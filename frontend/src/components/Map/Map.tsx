import {v4 as uuid4} from 'uuid';
import { FeatureCollection } from 'geojson';
import { LatLngTuple, Icon } from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import { FullscreenControl } from 'react-leaflet-fullscreen';
import DrawControls from './DrawControls';
import CountryGeoJson from './CountryGeoJson';
import ClaimForm from './claimForm';
import { useEffect, useState } from 'react';
import { BigNumberish } from 'ethers';
import useClaim, { ClaimProps } from '../../hooks/useClaim';
import { Types } from '../../types/Earthereum';

Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Map: React.FunctionComponent<{ countriesGeoJSON: FeatureCollection | undefined }> = ({ countriesGeoJSON }) => {
  const center: LatLngTuple = [51.505, -0.09];
  const tileLayerAttribution: string = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';
  const [showClaimForm, setShowClaimForm] = useState<boolean>(false);
  const [countryName, setCountryName] = useState<string>('');
  const [area, setArea] = useState<BigNumberish>(0);

  const {claim, loading} = useClaim();

  const onSaveClaimForm = (zkInput: Types.ProofInput, zkProof: Types.ProofStruct) => {
    const props: ClaimProps = {
      area: area,
      zkInput,
      zkProof,
      uri: ""
    }

    claim(props);
  }

  useEffect(() => {
    setShowClaimForm(loading);
  }, [loading]);

  const onClaimClick = (name: string, area: BigNumberish) => {
    setShowClaimForm(true);
    setCountryName(name);
    setArea(area);
  }

  return (
    <MapContainer center={center} zoom={3}>
      <TileLayer
        attribution={tileLayerAttribution}
        url="http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
      />
      <TileLayer
        attribution={tileLayerAttribution}
        url="http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png"
      />
      <FullscreenControl position='bottomright'/>

      {countriesGeoJSON!.features.map(feature =>
        <CountryGeoJson
          key={uuid4()}
          data={feature}
          onClaimClick={onClaimClick}
        />
      )}

      <DrawControls position='topright'/>

      <ClaimForm
        show={showClaimForm}
        onClose={() => setShowClaimForm(false)}
        onClaim={onSaveClaimForm}
        countryName={countryName}
        loading={loading}
      >
      </ClaimForm>
    </MapContainer>
  );
}

export default Map;