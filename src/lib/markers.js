    /* eslint-disable no-unused-vars */
    //import the DriftMarker from the leaflet-drift-marker library
    import DriftMarker from "leaflet-drift-marker";
    import $ from "jquery";
    import axios from "axios";
    import { io } from "socket.io-client";

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

    const ButtonToPar = `
    <button class="buttonParking popupButton">Parking</button>`;

    const ButtonToChar = `
    <button class="buttonCharging popupButton">Charging</button>`;

    //declare a variable to hold the icon to use and markers
    let IconChoice;
    let marker = [];
    let MarkerInUse = [];

    //create a function to get the scooters from the API and create markers for them
    function getScooters() {
    socket.on("scooters", (data) => {
        console.log("InUse Markers Array", MarkerInUse);
        console.log("Not InUse Markers Array", marker);

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
            Temp.bindPopup(`<h2>Scooter: ${scooter.name}</h2>
                <h3>Current Position: ${scooter.location.lat}, ${scooter.location.lng}</h3>
                ${ButtonUnRent}`);
            MarkerInUse.push(Temp);
        } else {
            Temp.bindPopup(
            `<h2>Scooter: ${scooter.name}</h2>
            <h3>Current Position: ${scooter.location.lat} 
            ${scooter.location.lng}</h3>
            ${ButtonRent}
            ${ButtonToPar}
            ${ButtonToChar}`, {className: "popup"}
            );
            marker.push(Temp);
        }
        Temp.on("popupopen", function () {
            $(".buttonRent").on("click", function () {
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
                console.log(Temp);
                Temp.setPopupContent(`<h2>Scooter: ${scooter.name}</h2>
            <h3>Current Position: ${scooter.location.lat}, ${scooter.location.lng}</h3>
            ${ButtonUnRent}`);
                Temp.closePopup();
                })
                .catch(function (error) {
                console.error(error);
                });
            });
            $(".buttonUnRent").on("click", function () {
            console.log(Temp);
            marker.push(Temp);
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
                console.log(MarkerInUse);
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
                `<h2>Scooter: ${scooter.name}</h2>
            <h3>Current Position: ${scooter.location.lat}
            ${scooter.location.lng}</h3>
            ${ButtonRent}
            ${ButtonToPar}
            ${ButtonToChar}`
                );
                Temp.closePopup();
                Temp.setIcon(IconMarkerWhite);
            }
            });
            $(".buttonParking").on("click", function () {
            Temp.slideTo([57.699498, 11.962688], {
                duration: 50000,
            });
            });

            $(".buttonCharging").on("click", function () {
            Temp.slideTo([57.696712, 11.956132], {
                duration: 50000,
            });
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
    console.log("marker in function", marker);
    for (let i = 0; i < marker.length; i++) {
        if (marker[i].options.inUse == false) {
        marker[i].slideCancel();
        }
    }
    }
    //call the onUpdateMap function every 2 seconds
    setInterval(onUpdateMap, 2000);
    }
