export default async function ToParkingStation(scooterId) {
  // Fetch the scooter data from the REST API
  const response = await fetch(
    `http://localhost:3000/v1/scooters/${scooterId}`
  );
  const scooter = await response.json();
  const ParkStation = [21, 91239123, 23, 21012313];
  // Slide the scooter to the destination with a velocity of 50000
  scooter.scooterId.slideTo(ParkStation, 50000);
  console.log(
    "Sending Scooter With ScooterID: ",
    scooterId,
    " To ParkingStation: ",
    ParkStation
  );
}
