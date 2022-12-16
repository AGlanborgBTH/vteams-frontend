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

  const IconMarkerWhite = leaflet.icon({
    iconUrl: "https://i.imgur.com/XxQMjkd.png",
    iconSize: [30, 48],
  });

  const IconMarkerGreen = leaflet.icon({
    iconUrl: "https://i.imgur.com/xz3ICLk.png",
    iconSize: [30, 48],
  });

  // let IconMarkerRed = leaflet.icon({
  //   iconUrl: "https://i.imgur.com/Elm3SkQ.png",
  //   iconSize: [30, 48],
  // });

  const ButtonRent = `<style>
  .button {
    background-color: #13aa52;
    border: 1px solid #13aa52;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, .1) 0 2px 4px 0;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    font-family: "Akzidenz Grotesk BQ Medium", -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 16px;
    font-weight: 400;
    outline: none;
    outline: 0;
    padding: 10px 25px;
    text-align: center;
    transform: translateY(0);
    transition: transform 150ms, box-shadow 150ms;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
  }
</style>
  <button class="button">Rent Scooter</button>`;

  const ButtonUnRent = `<style>
.button {
  background-color: red;
  border: 1px solid red;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, .1) 0 2px 4px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-family: "Akzidenz Grotesk BQ Medium", -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 16px;
  font-weight: 400;
  outline: none;
  outline: 0;
  padding: 10px 25px;
  text-align: center;
  transform: translateY(0);
  transition: transform 150ms, box-shadow 150ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}
</style>
<button class="button">Dont Renting</button>`;

  let IconChoice;
  let marker = [];
  let MarkerInUse = [];

  function getScooters() {
    fetch("http://localhost:3000/v1/scooters")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (const scooter of data.data) {
          if (scooter.inUse) {
            IconChoice = IconMarkerGreen;
          } else {
            IconChoice = IconMarkerWhite;
          }
          let Temp = new DriftMarker(
            [scooter.location.lat, scooter.location.lng],
            {
              icon: IconChoice,
              ID: scooter._id,
              title: scooter.name,
              destination: scooter.destination,
              velocity: scooter.velocity,
              inUse: scooter.inUse,
            }
          ).addTo(mapInstance);
          if (scooter.inUse) {
            Temp.bindPopup(`<h2>Scooter: ${scooter.name}</h2>
            <h3>Current Position: ${scooter.location.lat}, ${scooter.location.lng}</h3>
            ${ButtonUnRent}`);
            MarkerInUse.push(Temp);
          } else {
            Temp.bindPopup(`<h2>Scooter: ${scooter.name}</h2>
            <h3>Current Position: ${scooter.location.lat}, ${scooter.location.lng}</h3>
            ${ButtonRent}`);
          }
          marker.push(Temp);
        }
        // console.log(MarkerInUse[0].options.ID);
      });
  }

  // Call the getScooters function to start making requests to the API and add markers to the map
  getScooters();

  //   // Create a function that will update the map every 2 seconds
  async function onUpdateMap() {
    for (let i = 0; i < MarkerInUse.length; i++) {
      const response = await fetch(
        "http://localhost:3000/v1/scooters/" + MarkerInUse[i].options.ID
      );
      const data = await response.json();
      // console.log(MarkerInUse[i].options.ID);
      console.log(
        data.name +
          " New Destination Is: " +
          "Lat " +
          data.destination.lat +
          " Long " +
          data.destination.lng
      );
      MarkerInUse[i].slideTo(data.destination, {
        duration: data.velocity,
      });
    }
  }
  setInterval(onUpdateMap, 2000);
}
