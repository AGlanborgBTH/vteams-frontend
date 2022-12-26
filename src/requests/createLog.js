import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
let cityId = cookies.get("city")
let user = cookies.get("user")

export default async function createLog(scooterId, location) {
    let response = await fetch ("http://localhost:3000/v1/logs/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            description: "Start Renting Scooter",
            cityID: cityId,
            customerID: user.id,
            scooterID: scooterId,
            timeStart: Date.now(),
            locationStart: location
        })
      })

      let result = await response;
      console.log("result", result)
      return result;
}