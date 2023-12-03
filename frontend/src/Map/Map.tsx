import { FeatureCollection } from 'geojson';
import { LatLngTuple, Icon } from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import { FullscreenControl } from 'react-leaflet-fullscreen';
import CountriesLayer from './CountriesLayer';
import DrawControls from './DrawControls';

Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Map: React.FunctionComponent<{ countriesGeoJSON: FeatureCollection | undefined }> = ({ countriesGeoJSON }) => {
  const center: LatLngTuple = [51.505, -0.09];
  const tileLayerAttribution: string = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';

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

      <CountriesLayer data={countriesGeoJSON} />
      <DrawControls position='topright'/>

    </MapContainer>
  );
}

export default Map;