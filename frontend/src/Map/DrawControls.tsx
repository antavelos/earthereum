import L from 'leaflet';
import 'leaflet-draw';
import { useMap } from "react-leaflet";
import { useEffect } from "react";

const DrawControls: React.FunctionComponent<{ position: L.ControlPosition }> = ({position}) => {
  const map = useMap();

  useEffect(() => {
    const editableLayers = new L.FeatureGroup();

    const options: L.Control.DrawConstructorOptions = {
      position,
      draw: {
        polyline: false,
        polygon: false,
        marker: false,
        circlemarker: false,
        circle: false,
        rectangle: {},
      },
      edit: {
        featureGroup: editableLayers,
      },
    };
    const drawControl = new L.Control.Draw(options);

    map.addLayer(editableLayers);
    map.addControl(drawControl);

    return () => {
      map.removeLayer(editableLayers);
      map.removeControl(drawControl);
    };
  }, [map, position]);

  return <></>;
};

export default DrawControls;
