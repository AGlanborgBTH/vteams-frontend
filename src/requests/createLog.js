import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();


export default async function createLog(scooterId, name, location) {
    let cityId = cookies.get("city");
    let user = cookies.get("user");
    console.log(name)

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
            scooterName: name,
            timeStart: Date.now(),
            locationStart: location
        })
      })

      let result = await response;
      return result;
}