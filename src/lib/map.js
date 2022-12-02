
const api_url = 'http://localhost:3000/v1/cities/6384bb98897c01a69121c994';


export default async function map() {
    const response = await fetch(api_url);
    const data = await response.json();
    const {Geojson } = data;


    let L = require("leaflet");

    let map = L.map("map", {
        scrollWheelZoom: true,
    });
    
    map.setView([47.7, 13.35], 7);
    
    let tile = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });


    tile.addTo(map);

    L.geoJSON(Geojson.Limit,{
        style:{
            color: 'black',
            fillOpacity: 0
        }
    }).addTo(map);

    L.geoJSON(Geojson.Charging,{
        style:{
            color: 'blue',
            fillOpacity: 0.3
        }
    }).addTo(map);


    L.geoJSON(Geojson.Parking,{
        style:{
            color: 'green',
            fillOpacity: 0.3
        }
    }).addTo(map);


}