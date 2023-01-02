import axios from "axios";

//skapa if sats för checka stad samt ge kordinater.

export default async function ToParkingStation(scooterId) {
  axios.patch(`http://localhost:3000/v1/scooters/${scooterId}`, {
    location: {
      satus: "Parked",
      lng: "21,231231231",
      lat: "23,91821238123",
    },
  });
}
