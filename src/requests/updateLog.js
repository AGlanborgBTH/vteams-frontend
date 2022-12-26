import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
let recordID = cookies.get("recordID")

export default async function updateLog(location) {
    let response = await fetch (`http://localhost:3000/v1/logs/${recordID}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            description: "Stop Renting Scooter",
            timeEnd: Date.now(),
            locationEnd: location
        })
      })

      let result = await response;
      console.log("result", result)
      return result;
}
