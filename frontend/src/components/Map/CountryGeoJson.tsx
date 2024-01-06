import { Feature } from 'geojson';
import { Button, Card } from 'react-bootstrap';
import { GeoJSON, Popup } from 'react-leaflet';
import {v4 as uuid4} from 'uuid';
import BigNumber from "bignumber.js";
import { useEffect, useState } from 'react';
import ClaimForm from './claimForm';
import { Types } from '../../types/Earthereum';
import useClaim, { ClaimProps } from '../../hooks/useClaim';
import { BigNumberish } from 'ethers';

const formatBigNumber = (num: number): string => (new BigNumber(num)).toFormat();

type CountryProps = {
  data: Feature;
  onClaimClick: (name: string, area: BigNumberish) => void;
}

const CountryGeoJson: React.FunctionComponent<CountryProps> = ({ data, onClaimClick }) => {
  const [showClaimForm, setShowClaimForm] = useState(false);
  const {claim, loading} = useClaim();

  const onSaveClaimForm = (zkInput: Types.ProofInput, zkProof: Types.ProofStruct) => {
    const props: ClaimProps = {
      area: data.properties!.areaInKm2,
      zkInput,
      zkProof,
      uri: ""
    }

    claim(props);
  }

  useEffect(() => {
    setShowClaimForm(loading);
  }, [loading]);

  return (
    <>
      <GeoJSON
        key={uuid4()}
        data={data}
        style={{weight: 2, dashArray: '3', fillOpacity: 0.5}}
        eventHandlers={{
          mouseover: (e) => {
            e.target.setStyle({fillOpacity: .7, dashArray: ''});
          },
          mouseout: (e) => {
            e.target.setStyle({fillOpacity: .5, dashArray: '3'});
          }
        }}
      >
        <Popup>
          <Card style={{ width: '18rem' }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Header as="h5">{data.properties!.name}</Card.Header>
            <Card.Body>
              {/* <Card.Title>{data.properties!.name}</Card.Title> */}
              <Card.Text>
              Total area: {formatBigNumber(data.properties!.areaInKm2)} km<sup>2</sup>
              </Card.Text>
              <Button variant="outline-success" size='sm' onClick={() => onClaimClick(data.properties!.name, data.properties!.areaInKm2)}>Claim</Button>{' '}
              <Button variant="outline-success" size='sm'>Sell</Button>{' '}
              <Button variant="outline-success" size='sm'>Buy</Button>
            </Card.Body>
          </Card>
        </Popup>
      </GeoJSON>
    </>
  )
}

export default CountryGeoJson;