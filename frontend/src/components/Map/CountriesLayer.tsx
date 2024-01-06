import { FeatureCollection } from 'geojson';
import {v4 as uuid4} from 'uuid';
import CountryGeoJson from './CountryGeoJson';


const CountriesLayer: React.FunctionComponent<{ data?: FeatureCollection }> = ({ data }) => {
	return (
		<>
			{data!.features.map(feature => <CountryGeoJson key={uuid4()} data={feature} />)}
		</>
  )
}

export default CountriesLayer;