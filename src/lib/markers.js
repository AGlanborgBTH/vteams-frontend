/* eslint-disable no-unused-vars */
import DriftMarker from "leaflet-drift-marker";
import $ from "jquery";
import axios from "axios";
import { io } from "socket.io-client";
import createLog from "@/requests/createLog";
import updateLog from "@/requests/updateLog";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

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
    console.log("Connected to the server from vue");
    });

    // let IconMarkerRed = leaflet.icon({
    //   iconUrl: "https://i.imgur.com/Elm3SkQ.png",
    //   iconSize: [30, 48],
    // });

    //create the HTML for two buttons - rent and unrent
    const ButtonRent = `
    <button class="buttonRent popupButton">Rent</button>`;

    const ButtonUnRent = `
    <button class="buttonUnRent popupButton">Cancel</button>`;


    //declare a variable to hold the icon to use and markers
    let IconChoice;
    let marker = [];
    let MarkerInUse = [];

    // Icons for the popupOppen
    var battIcon = "<img class='batteryIcon' src ='https://i.imgur.com/16DYTp7.png' />"
    var verLine = "<img class='verLineIcon' src ='https://i.imgur.com/mEifOoA.png' />"
    var horLine = "<img class='horLineIcon' src ='https://i.imgur.com/NQ33RFG.png' />"

    //create a function to get the scooters from the API and create markers for them
    function getScooters() {
    socket.on("scooters", (data) => {

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
            draggable: true,
            ID: scooter._id,
            title: scooter.name,
            destination: scooter.destination,
            velocity: scooter.velocity,
            inUse: scooter.inUse,
            }
        ).addTo(mapInstance);
        if (scooter.inUse) {
            Temp.bindPopup(`<div class="popupUpper"> ${battIcon } <p>0%</p> ${verLine} <p class="scooterName"> ${ scooter.name}</p></div>
                ${horLine}
                <p> 5 Kr/Min <p>

                ${ButtonUnRent}`, {className: "popup"});
            MarkerInUse.push(Temp);
        } else {
          Temp.bindPopup(
            `<div class="popupUpper"> ${battIcon } <p>0%</p> ${verLine} <p class="scooterName"> ${ scooter.name}</p></div>
            ${horLine}
            <p class="scooterPrice"> 5 Kr/Min </p>
            ${ButtonRent}
            `, {className: "popup"}
            );
            marker.push(Temp);
        }
        Temp.on("popupopen", function () {
          $(".buttonRent").on("click", async function () {
            await createLog(scooter._id, {lat:scooter.location.lat, lng:scooter.location.lng})
            axios
                .patch(`http://localhost:3000/v1/scooters/${scooter._id}`, {
                inUse: true,
              })
              .then(function (response) {
                MarkerInUse.push(Temp);
                var index = marker.indexOf(Temp);
                if (index !== -1) {
                    marker.splice(index, 1);
                }
                Temp.setIcon(IconMarkerGreen);
                Temp.setPopupContent(`<div class="popupUpper"> ${battIcon } <p>0%</p> ${verLine} <p class="scooterName"> ${ scooter.name}</p></div>
                ${horLine}
                <p> 5 Kr/Min <p>

                ${ButtonUnRent}`);
                Temp.closePopup();
                })
                .catch(function (error) {
                console.error(error);
              });
          });

          $(".buttonUnRent").on("click", async function () {
          await updateLog(scooter._id, {lat:scooter.location.lat, lng:scooter.location.lng})
            Temp.slideCancel();
            Temp.options.inUse = false;
            let currentLocation = Temp.getLatLng();
            axios
                .patch(`http://localhost:3000/v1/scooters/${scooter._id}`, {
                inUse: false,
                location: {
                    lng: currentLocation.lng,
                    lat: currentLocation.lat,
                },
                destination: {
                    lat: "",
                    lng: "",
                },
              })
              .then(function (response) {
                marker.push(Temp);
                })
                .catch(function (error) {
                console.error(error);
                });
            if (MarkerInUse.length > 0) {
                var index = MarkerInUse.indexOf(Temp);
                if (index !== -1) {
                MarkerInUse.splice(index, 1);
              }
              Temp.bindPopup(
                `<div class="popupUpper"> ${battIcon } <p>0%</p> ${verLine} <p class="scooterName"> ${ scooter.name}</p></div>
                ${horLine} <br>
            ${ButtonRent}`
              );
              Temp.closePopup();
              Temp.setIcon(IconMarkerWhite);
            }
          });
        });
        }
    });
  }

  // Call the getScooters function to start making requests to the API and add markers to the map
  getScooters();

  // create a function that will update the map every 2 seconds
  async function onUpdateMap() {
    for (let i = 0; i < MarkerInUse.length; i++) {
      //make a request to the API to get the scooter data
      const response = await fetch(
        "http://localhost:3000/v1/scooters/" + MarkerInUse[i].options.ID
      );
      const data = await response.json();
      //update the marker's position using the new destination and velocity
      MarkerInUse[i].slideTo(data.destination, {
        duration: data.velocity,
      });
    }
  }

  async function SlideCancelFunction() {
    for (let i = 0; i < marker.length; i++) {
      if (marker[i].options.inUse == false) {
        marker[i].slideCancel();
      }
    }
  }
  setInterval(SlideCancelFunction, 500);
  //call the onUpdateMap function every 2 seconds
  setInterval(onUpdateMap, 2000);
}
