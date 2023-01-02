import axios from "axios";

const GOOGLE_MAPS_API_KEY = "AIzaSyDkaBm3UT92TeIobvXAz8";

export default async function getAddressFromLatLng(lat, lng) {
  try {
    // Make a request to the Google Maps Geocoding API to get the address
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
    );

    // Extract the formatted address from the API response
    const address = response.data.results[0].formatted_address;

    return address;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
