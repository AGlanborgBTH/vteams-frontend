/* eslint-disable no-unused-vars */
//import the DriftMarker from the leaflet-drift-marker library
import DriftMarker from "leaflet-drift-marker";
import $ from "jquery";
import axios from "axios";
import { io } from 'socket.io-client';

//export the markers function as an async function
export default async function markers(mapInstance) {
  //require the leaflet library
  let leaflet = require("leaflet");

  //create three icons for the markers - white, green and red
  const IconMarkerWhite = leaflet.icon({
    iconUrl: "https://i.imgur.com/XxQMjkd.png",
    iconSize: [30, 48],
  });

  const IconMarkerGreen = leaflet.icon({
    iconUrl: "https://i.imgur.com/xz3ICLk.png",
    iconSize: [30, 48],
  });


  const socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
  socket.on("connecting", () => {
    console.log("Connected to the server from vue")
  })

  // let IconMarkerRed = leaflet.icon({
  //   iconUrl: "https://i.imgur.com/Elm3SkQ.png",
  //   iconSize: [30, 48],
  // });

  //create the HTML for two buttons - rent and unrent
  const ButtonRent = `<style>
        .buttonRent {
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
        <button class="buttonRent">Rent Scooter</button>`;

  const ButtonUnRent = `<style>
        .buttonUnRent {
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
        <button class="buttonUnRent">Dont Renting</button>`;

  const ButtonToPar = `<style>
        .buttonParking {
        background-color: blue;
        border: 1px solid blue;
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
        <button class="buttonParking">Send to parking</button>`;

  const ButtonToChar = `<style>
        .buttonCharging {
        background-color: purple;
        border: 1px solid purple;
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
        <button class="buttonCharging">Send to charging</button>`;

  //declare a variable to hold the icon to use
  let IconChoice;

  //create a function to get the scooters from the API and create markers for them
  function getScooters() {
    socket.on("scooters", (data) => {
      console.log(data.data)

      //declare two arrays to hold the markers and markers in use
      let marker = [];
      let MarkerInUse = [];

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
          Temp.on("popupopen", function () {
            $(".buttonUnRent").on("click", function () {
              axios
                .patch(`http://localhost:3000/v1/scooters/${scooter._id}`, {
                  inUse: false,
                })
                .then(function (response) {
                  console.log(response.data);
                })
                .catch(function (error) {
                  console.error(error);
                });
              
            });
          });
          MarkerInUse.push(Temp);
        } else {
          Temp.bindPopup(
            `<h2>Scooter: ${scooter.name}</h2>, 
            <h3>Current Position: ${scooter.location.lat}, 
            ${scooter.location.lng}</h3>,
            ${ButtonRent},
            ${ButtonToPar},
            ${ButtonToChar}`
          );
          Temp.on("popupopen", function () {
            //Renting Button
            $(".buttonRent").on("click", function () {
              axios
                .patch(`http://localhost:3000/v1/scooters/${scooter._id}`, {
                  inUse: true,
                })
                .then(function (response) {
                  Temp.bindPopup(`<h2>Scooter: ${scooter.name}</h2>
                  <h3>Current Position: ${scooter.location.lat}, ${scooter.location.lng}</h3>
                  ${ButtonUnRent}`);
                  console.log(response.data);
                  socket.emit("rentScooter")
                })
                .catch(function (error) {
                  console.error(error);
                });
            });

            $(".buttonParking").on("click", function () {
              console.log("Sending Scooter To Parking Station");
              Temp.slideTo([57.699498, 11.962688], {
                duration: 50000,
              });
            });

            $(".buttonCharging").on("click", function () {
              console.log("Sending Scooter To Charging Station");
              Temp.slideTo([57.696712, 11.956132], {
                duration: 50000,
              });
            });
          });
        }
        //add the marker to the marker array
        marker.push(Temp);
      }
    })
  }

  // function chargeScooter(scooter) {
  //   axios
  //   .patch(`http://localhost:3000/v1/scooters/${scooter._id}`, {
  //     charging: true,
  //     location: {lat: 57.696712, lng: 11.956132}
  //   })
  //   .then(function (response) {
  //     console.log(response.data);
  //   })
  //   .catch(function (error) {
  //     console.error(error);
  //   });
  // }


  // Call the getScooters function to start making requests to the API and add markers to the map
  getScooters();


  // setInterval(onUpdateMap, 2000);
  //create a function that will update the map every 2 seconds
  // async function onUpdateMap() {
  //   for (let i = 0; i < MarkerInUse.length; i++) {
  //     //make a request to the API to get the scooter data
  //     const response = await fetch(
  //       "http://localhost:3000/v1/scooters/" + MarkerInUse[i].options.ID
  //     );
  //     const data = await response.json();
  //     //   console.log(
  //     //     data.name +
  //     //       " New Destination Is: " +
  //     //       "Lat " +
  //     //       data.destination.lat +
  //     //       " Long " +
  //     //       data.destination.lng
  //     //   );
  //     //update the marker's position using the new destination and velocity
  //     MarkerInUse[i].slideTo(data.destination, {
  //       duration: data.velocity,
  //     });
  //   }
  // }
  // //call the onUpdateMap function every 2 seconds
  // 
}
