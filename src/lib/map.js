    import markers from "./markers";

        export default async function map(cityId) {
        const apiUrl = `http://localhost:3000/v1/cities/${cityId}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        const { geojson, center } = data;

        //require the leaflet library
        let leaflet = require("leaflet");

        let mapInstance = leaflet.map("map", {
        scrollWheelZoom: true,
        });

        // The center coordinates and GeoJSON objects are used to set up the map, and the layers are styled using the layerStyling object.
        mapInstance.setView([center.lat, center.long], 7);

        // Tile Layer
        let tile = leaflet.tileLayer(
        "https://api.mapbox.com/styles/v1/silvacastillo/cla30jg7d006e15sez6ruscrt/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2lsdmFjYXN0aWxsbyIsImEiOiJjbGEzMGczbWkwbGVjM25wZXVyZjJ0bnY2In0.biCDV09vUoUSHFppboPtjw",
        {
            maxZoom: 19,
            attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }
        );
        tile.addTo(mapInstance);

        // Layer Styling
        const layerStyling = {
        limit: {
            style: {
            color: "black",
            fillOpacity: 0,
            },
        },
        charging: {
            style: {
            color: "blue",
            fillOpacity: 0.3,
            },
        },
        parking: {
            style: {
            color: "green",
            fillOpacity: 0.3,
            },
        },
        };

        // Layer Group
        let layerGroup = leaflet.layerGroup();

        // Adding GeoJSONs to Map
        for (let key in geojson) {
        layerGroup.addLayer(leaflet.geoJSON(geojson[key], layerStyling[key]));
        }
        layerGroup.addTo(mapInstance);


        // Finally, the map is fit to the bounds of the layerGroup.
        mapInstance.fitBounds(
        layerGroup
            .getLayers()
            .reduce(
            (bounds, layer) => bounds.extend(layer.getBounds()),
            leaflet.latLngBounds([])
            )
        );
        // Add markers to the map
        markers(mapInstance);
    }