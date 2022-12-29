export default async function getAddressGoogle(location) {
    let key = process.env.VUE_APP_GOOGLE_API_KEY
    let lat = location.lat;
    let long = location.lng;
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${key}`;
    let response = await fetch(url, {method: "GET"});

    let result = await response.json();
    return result;
}