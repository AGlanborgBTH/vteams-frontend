export default async function ToChargingStation(scooterId) {
  // Fetch the scooter data from the REST API
  const response = await fetch(
    `http://localhost:3000/v1/scooters/${scooterId}`
  );
  const scooter = await response.json();
  const ChargeStation = [21, 91239123, 23, 21012313];
  // Slide the scooter to the destination with a velocity of 50000
  scooter.scooterId.slideTo(ChargeStation, 50000);
  console.log(
    "Sending Scooter With ScooterID: ",
    scooterId,
    " To ChargeStation: ",
    ChargeStation
  );
}
