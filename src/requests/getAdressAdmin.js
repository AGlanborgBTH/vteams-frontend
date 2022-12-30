export default async function getAddress(lat, lng) {
  const apiKey = "YOUR_API_KEY";
  const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

  fetch(endpoint)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Request failed");
    })
    .then((data) => {
      if (data.status === "OK") {
        return data.results[0].formatted_address;
      }
      throw new Error("No address found");
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
}
