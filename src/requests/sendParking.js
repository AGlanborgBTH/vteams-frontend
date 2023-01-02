import axios from "axios";

//skapa if sats för checka stad samt ge kordinater.
export default async function ToParkingStation(scooterId) {
  const currentLocationlng = 21.11111;
  const currentLocationlat = 21.22222;
  const scooter = await axios.get(
    `http://localhost:3000/v1/scooters/${scooterId}`
  );
  console.log(scooter.data.city);
  if (scooter.data.city === "Göteborg") {
    await axios.patch(`http://localhost:3000/v1/scooters/${scooterId}`, {
      location: {
        lng: currentLocationlng,
        lat: currentLocationlat,
      },
    });
    console.log("Sent Scooter To Parking");
  }
}
