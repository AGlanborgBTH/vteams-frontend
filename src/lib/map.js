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


let marker
// First, we will create a function that will make an HTTP GET request to the API endpoint
function getScooters() {
  fetch('http://localhost:3000/v1/scooters')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (const scooter of data.data) {
        // Create a marker for each scooter
         marker = new DriftMarker([scooter.location.lat, scooter.location.long], {
          //create a popup window that shows scooter.name
          icon: leaflet.icon({
            iconUrl: "https://i.imgur.com/NGiQZ9C.png",
            iconSize: [30, 48],
          }),
          title: scooter.name,
        }).addTo(mapInstance);
      }
    });
}


// Call the getScooters function to start making requests to the API and add markers to the map
getScooters();


  // marker.slideTo([59.71646139531549, 12.013669635629554], {
  // duration: 2000,
  // keepAtCenter: true,
  // });
  // Script for adding marker on map click
  function onMapClick(e) {
    console.log("e.latlng", e.latlng);
    marker.slideTo(e.latlng, { duration: 2500 });
    // Update marker on changing it's position
    marker.on("dragend", function (ev) {
      var chagedPos = ev.target.getLatLng();
      this.bindPopup(chagedPos.toString()).openPopup();
    });
  }
  // alert("click on the map to move marker");
  mapInstance.on("click", onMapClick);
}
