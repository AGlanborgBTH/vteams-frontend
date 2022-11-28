export default function map() {
    let L = require("leaflet");

    let map = L.map("map", {
        scrollWheelZoom: false,
    });
    
    map.setView([47.7, 13.35], 7);
    
    let tile = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });
    
    tile.addTo(map);
}