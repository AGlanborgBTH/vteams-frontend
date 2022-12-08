// This function loads a map using the Leaflet library and displays the city boundaries as defined by the cityId parameter.
const cityId = '6384bb98897c01a69121c994';
export default async function map() {

    const apiUrl  = `http://localhost:3000/v1/cities/${cityId}`;
    const response = await fetch(apiUrl );
    const data = await response.json();
    const {Geojson, Center } = data;

    let leaflet = require("leaflet");

    let mapInstance = leaflet.map("map", {
        scrollWheelZoom: true,
    });

    // The center coordinates and GeoJSON objects are used to set up the map, and the layers are styled using the layerStyling object.
    mapInstance.setView([Center.Lat, Center.Long], 7);  
    
    
    // Tile Layer
    let tile = leaflet.tileLayer("https://api.mapbox.com/styles/v1/silvacastillo/cla30jg7d006e15sez6ruscrt/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2lsdmFjYXN0aWxsbyIsImEiOiJjbGEzMGczbWkwbGVjM25wZXVyZjJ0bnY2In0.biCDV09vUoUSHFppboPtjw", {
        maxZoom: 19,
        attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });
    tile.addTo(mapInstance);

   // Layer Styling
    const layerStyling = {
        Limit: {
            style: {
                color: 'black',
                fillOpacity: 0,
            }
        },
        Charging: {
            style: {
                color: 'blue',
                fillOpacity: 0.3
            }
        },
        Parking: {
            style: {
                color: 'green',
                fillOpacity: 0.3
            }
        }
    }

    // Layer Group
    let layerGroup = leaflet.layerGroup();

     // Adding GeoJSONs to Map
    for (let key in Geojson) {
        layerGroup.addLayer(leaflet.geoJSON(Geojson[key], layerStyling[key]));
    }

    layerGroup.addTo(mapInstance);
    // Finally, the map is fit to the bounds of the layerGroup.
    
    mapInstance.fitBounds(layerGroup.getLayers().reduce((bounds, layer) => bounds.extend(layer.getBounds()), leaflet.latLngBounds([])));
}
