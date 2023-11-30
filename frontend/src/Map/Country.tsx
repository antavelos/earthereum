import { Feature } from 'geojson';
import { Button, Card } from 'react-bootstrap';
import { GeoJSON, Popup } from 'react-leaflet';
import {v4 as uuid4} from 'uuid';

const Country: React.FunctionComponent<{ data: Feature }> = ({ data }) => {
  return (
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

            </Card.Text>
            <Button variant="outline-success" size='sm'>Claim</Button>{' '}
            <Button variant="outline-success" size='sm'>Sell</Button>{' '}
            <Button variant="outline-success" size='sm'>Buy</Button>
          </Card.Body>
        </Card>
      </Popup>
    </GeoJSON>
  )
}

export default Country;