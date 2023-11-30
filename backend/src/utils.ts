import { readFileSync, writeFileSync } from "fs";
import { FeatureCollection, Feature } from 'geojson'
import geoJsonArea from '@mapbox/geojson-area';

const path = '../../frontend/src/countries.geojson';

const data = readFileSync(path);

let geoJSON: FeatureCollection = JSON.parse(data.toString());

geoJSON.features = geoJSON.features.map((feature: Feature) => {
  const [area] = (geoJsonArea.geometry(feature.geometry) / 1000000).toString().split('.')

  feature.properties!.areaInKm2 = Number(area);

  return {...feature};
});

writeFileSync(path, JSON.stringify(geoJSON));