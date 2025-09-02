/** Fetches detailed information for all bus stops currently being serviced by buses */
require("dotenv").config({ path: ".env.local" });
const fs = require("fs").promises;

async function fetchBusStops() {
    let skip = 0;
    let busStops = [];

    const options = {
        headers: { AccountKey: process.env.LTA_DATAMALL_API_KEY },
    };

    while (true) {
        try {
            const url = `https://datamall2.mytransport.sg/ltaodataservice/BusStops?$skip=${skip}`;
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const data = await response.json();

            if (data.value.length === 0) break;

            busStops = busStops.concat(data.value);

            skip += 500;
        } catch (error) {
            console.error(error.message);
            break;
        }
    }

    await fs.writeFile(
        "./data/bus-stops.json",
        JSON.stringify(busStops, null, 4)
    );
    console.log(`Saved ${busStops.length} bus stops.`);
}

fetchBusStops();
