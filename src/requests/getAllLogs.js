export default async function getAllLogs() {
    let response = await fetch ("http://localhost:3000/v1/logs/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
      })

      let result = await response.json();
      return result;
}