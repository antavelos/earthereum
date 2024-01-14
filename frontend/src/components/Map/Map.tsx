import {v4 as uuid4} from 'uuid';
import { FeatureCollection, Feature } from 'geojson';
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
import { IContractContext, useContractContext } from '../../context/ContractContext';
import * as utils from '../../utils';

Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

type FeatureData = {
  countryName: string;
  area: BigNumberish;
  coordinatesHash: string;
}

const makeZKInput = (coordinatesHash: string, expectedHash: string): Types.ZKInput => {
  return [coordinatesHash, expectedHash].map(utils.splitHex).flat() as Types.ZKInput
};

const Map: React.FunctionComponent<{ countriesGeoJSON: FeatureCollection | undefined }> = ({ countriesGeoJSON }) => {
  const center: LatLngTuple = [51.505, -0.09];
  const tileLayerAttribution: string = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';

  const [showClaimForm, setShowClaimForm] = useState<boolean>(false);
  const [featureData, setFeatureData] = useState<FeatureData>({
    countryName: "",
    area: 0,
    coordinatesHash: ""
  });

  const {claim, loading, claimed} = useClaim();
  const {getEarthBalance, getLandBalance} = useContractContext() as IContractContext;

  const onSaveClaimForm = (expectedHash: string, zkProof: Types.ProofStruct) => {
    const props: ClaimProps = {
      area: featureData.area,
      zkInput: makeZKInput(featureData.coordinatesHash, expectedHash),
      zkProof,
      uri: ""
    }

    claim(props);
  }

  const onClaimClick = (feature: Feature) => {
    if (!feature) {
      return;
    }

    setShowClaimForm(true);

    setFeatureData({
      ...featureData,
      countryName: feature.properties?.name,
      area: feature.properties?.areaInKm2,
      coordinatesHash: utils.hashCoordinates(feature)
    })
  }

  useEffect(() => {
    setShowClaimForm(loading);
  }, [loading]);

  useEffect(() => {
    if (claimed) {
      getEarthBalance();
      getLandBalance();
    }
  }, [claimed, getEarthBalance, getLandBalance]);

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
        countryName={featureData.countryName}
        loading={loading}
      >
      </ClaimForm>
    </MapContainer>
  );
}

export default Map;