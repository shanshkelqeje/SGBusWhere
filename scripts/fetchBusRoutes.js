/** Fetches detailed route information for all services currently in operation */
require("dotenv").config({ path: ".env.local" });
const fs = require("fs").promises;

async function fetchBusRoutes() {
    let skip = 0;
    let busRoutes = [];

    const options = {
        headers: { AccountKey: process.env.LTA_DATAMALL_API_KEY },
    };

    while (true) {
        try {
            const url = `https://datamall2.mytransport.sg/ltaodataservice/BusRoutes?$skip=${skip}`;
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const data = await response.json();

            if (data.value.length === 0) break;

            busRoutes = busRoutes.concat(data.value);

            skip += 500;
        } catch (error) {
            console.error(error.message);
            break;
        }
    }

    await fs.writeFile(
        "./data/bus-routes.json",
        JSON.stringify(busRoutes, null, 4)
    );
    console.log(`Saved ${busRoutes.length} bus routes.`);
}

fetchBusRoutes();
