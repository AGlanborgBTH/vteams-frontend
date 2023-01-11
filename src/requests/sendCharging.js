import axios from "axios";
//skapa if sats för checka stad samt ge kordinater.

export default async function ToChargingStation(scooterId) {
  const scooter = await axios.get(
    `http://localhost:3000/v1/scooters/${scooterId}`
  );

  if (scooter.data.city === "Göteborg") {
    await axios.patch(`http://localhost:3000/v1/scooters/${scooterId}`, {
      status: "Charging",
      battery: "100",
      location: {
        lat: getRandomArbitrary(57.695892, 57.696712),
        lng: getRandomArbitrary(11.953149, 11.956132)
      },
    });
  } else if (scooter.data.city === "Uppsala") {
    await axios.patch(`http://localhost:3000/v1/scooters/${scooterId}`, {
      status: "Charging",
      battery: "100",
      location: {
        lat: getRandomArbitrary(59.857474, 59.858426),
        lng: getRandomArbitrary(17.660741, 17.670841)
      },
    });
  } else
    await axios.patch(`http://localhost:3000/v1/scooters/${scooterId}`, {
      status: "Charging",
      battery: "100",
      location: {
        lat: getRandomArbitrary(58.405142, 58.405617),
        lng: getRandomArbitrary(15.59299, 15.595082)
      },
    });
}

function getRandomArbitrary(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(6));
}
