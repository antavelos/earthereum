import { readFileSync } from "fs";
import geoJsonArea from '@mapbox/geojson-area';
import { sha256 } from "ethers";
const updateArea = (feature) => {
    const [area] = (geoJsonArea.geometry(feature.geometry) / 1000000).toString().split('.');
    feature.properties.areaInKm2 = Number(area);
    return { ...feature };
};
const hashCoordinates = (feature) => {
    const coordStr = JSON.stringify(feature.geometry.coordinates);
    feature.properties.coordinatesHash = sha256(Buffer.from(coordStr));
    return { ...feature };
};
const fileUpdate = () => {
    const inputFile = process.argv[2];
    if (inputFile === undefined) {
        throw Error("input file is required");
    }
    const data = readFileSync(inputFile);
    let geoJSON = JSON.parse(data.toString());
    geoJSON.features = geoJSON.features.map(updateArea);
    geoJSON.features = geoJSON.features.map(hashCoordinates);
    console.log(JSON.stringify(geoJSON));
};
const merger = () => {
    const certFile = process.argv[2];
    const geoJsonFile = process.argv[3];
    if (certFile === undefined || geoJsonFile === undefined) {
        throw Error("input files are required");
    }
    const certsData = readFileSync(certFile);
    const geoJsonData = readFileSync(geoJsonFile);
    let certs = JSON.parse(certsData.toString());
    let geoJSON = JSON.parse(geoJsonData.toString());
    geoJSON.features.map((feature, i) => {
        certs[i].coordinatesHash = feature.properties.coordinatesHash;
        return { ...feature };
    });
    console.log(JSON.stringify(certs));
};
// fileUpdate();
merger();
//# sourceMappingURL=utils.js.map