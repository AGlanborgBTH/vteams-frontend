let pricePerMin = 10;
import updateWallet from "./updateWallet";
import getWalletValue from "./getWalletValue";

export default async function updateLog(scooterId, location) {
    let allLogs = await getAllLogs();
    let currentWallet = await getWalletValue();

    for (const log of allLogs.data) {
        if (log.scooterID == scooterId && log.description == "Start Renting Scooter") {
            let logId = log._id;
            let timeStarted = log.timeStart;
            let timeEnded = Date.now()
            let timeInUse = ((timeEnded - timeStarted)/60000);
            let cost = Math.ceil(timeInUse*pricePerMin);

            let newWallet = currentWallet - cost
            await updateWallet(newWallet)

            let response = await fetch (`http://localhost:3000/v1/logs/${logId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    description: "Stop Renting Scooter",
                    timeEnd: timeEnded,
                    locationEnd: location,
                    totalCost: cost
                })
        })

        let result = await response;
        return result;
        }
    }
}

async function getAllLogs() {
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