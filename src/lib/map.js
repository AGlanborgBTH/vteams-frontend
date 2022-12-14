// This function loads a map using the Leaflet library and displays the city boundaries as defined by the cityId parameter.

import DriftMarker from "leaflet-drift-marker";
//var DriftMarker=require("leaflet-drift-marker")

export default async function map(cityId) {
  const apiUrl = `http://localhost:3000/v1/cities/${cityId}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  const { geojson, center } = data;

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

  let marker;

  let IconMarkerWhite = leaflet.icon({
    iconUrl: "https://i.imgur.com/XxQMjkd.png",
    iconSize: [30, 48],
  });

  let IconMarkerGreen = leaflet.icon({
    iconUrl: "https://i.imgur.com/xz3ICLk.png",
    iconSize: [30, 48],
  });

  // let IconMarkerRed = leaflet.icon({
  //   iconUrl: "https://i.imgur.com/Elm3SkQ.png",
  //   iconSize: [30, 48],
  // });

  let IconChoice;

  // First, we will create a function that will make an HTTP GET request to the API endpoint
  function getScooters() {
    fetch("http://localhost:3000/v1/scooters")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (const scooter of data.data) {
          // Create a marker for each scooter
          if (scooter.inUse) {
            IconChoice = IconMarkerGreen;
          } else {
            IconChoice = IconMarkerWhite;
          }
          marker = new DriftMarker(
            [scooter.location.lat, scooter.location.long],
            {
              icon: IconChoice,
              title: scooter.name,
            }
          ).addTo(mapInstance);
          // console.log(marker);
          marker.bindPopup(`<h2>Scooter: ${scooter.name}</h2>
          <h3>Current Position: ${scooter.location.lat}, ${scooter.location.long}</h3>`);
        }
      });
  }

  // Call the getScooters function to start making requests to the API and add markers to the map
  getScooters();

  // Create a function that will update the map every 2 seconds
  function onUpdateMap() {
    fetch("http://localhost:3000/v1/scooters")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (const scooter of data.data) {
          if (scooter.inUse) {
            marker.slideTo(scooter.destination, {
              duration: scooter.velocity,
            });
          }
        }
      });
  }
  setInterval(onUpdateMap, 2000);
}
