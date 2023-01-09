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
        lng: getRandomArbitrary(11.961167, 11.962688),
        lat: getRandomArbitrary(57.697748, 57.699498),
      },
    });
  } else if (scooter.data.city === "Uppsala") {
    await axios.patch(`http://localhost:3000/v1/scooters/${scooterId}`, {
      status: "Parking",
      location: {
        lng: getRandomArbitrary(17.66485, 17.6682),
        lat: getRandomArbitrary(59.860553, 59.862642),
      },
    });
  } else
    await axios.patch(`http://localhost:3000/v1/scooters/${scooterId}`, {
      status: "Parking",
      location: {
        lng: getRandomArbitrary(15.603187, 15.609689),
        lat: getRandomArbitrary(58.406715, 58.407901),
      },
    });
}

function getRandomArbitrary(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(6));
}
