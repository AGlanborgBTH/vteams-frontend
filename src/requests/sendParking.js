import axios from "axios";

//skapa if sats för checka stad samt ge kordinater.
export default async function ToParkingStation(scooterId) {
  const scooter = await axios.get(
    `http://localhost:3000/v1/scooters/${scooterId}`
  );
  console.log(scooter.data.city);
  if (scooter.data.city === "Göteborg") {
    await axios.patch(`http://localhost:3000/v1/scooters/${scooterId}`, {
      status: "Parking",
      location: {
        lng: 111111,
        lat: 111111,
      },
    });
  } else if (scooter.data.city === "Uppsala") {
    await axios.patch(`http://localhost:3000/v1/scooters/${scooterId}`, {
      location: {
        status: "Parking",
        lng: 222222,
        lat: 222222,
      },
    });
  } else
    await axios.patch(`http://localhost:3000/v1/scooters/${scooterId}`, {
      location: {
        status: "Parking",
        lng: 333333,
        lat: 333333,
      },
    });
}
