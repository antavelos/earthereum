import { FeatureCollection } from 'geojson';
import {v4 as uuid4} from 'uuid';
import Country from './Country';

const Countries: React.FunctionComponent<{ data: FeatureCollection }> = ({ data }) => {

	if (!data || !data.features) {
		return (<></>)
	}

	return (
		<>
			{data.features.map(feature => <Country key={uuid4()} data={feature}></Country>)}
		</>
  )
}

export default Countries;