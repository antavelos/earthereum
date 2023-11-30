"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const geojson_area_1 = __importDefault(require("@mapbox/geojson-area"));
const path = '../../frontend/src/countries.geojson';
const data = (0, fs_1.readFileSync)(path);
let geoJSON = JSON.parse(data.toString());
geoJSON.features = geoJSON.features.map((feature) => {
    const [area] = (geojson_area_1.default.geometry(feature.geometry) / 1000000).toString().split('.');
    feature.properties.areaInKm2 = Number(area);
    return Object.assign({}, feature);
});
(0, fs_1.writeFileSync)(path, JSON.stringify(geoJSON));
//# sourceMappingURL=utils.js.map