/** Fetches detailed service information for all buses currently in operation */
require("dotenv").config({ path: ".env.local" });
const fs = require("fs").promises;

async function fetchBusServices() {
    let skip = 0;
    let services = [];

    const options = {
        headers: { AccountKey: process.env.LTA_DATAMALL_API_KEY },
    };

    while (true) {
        try {
            const url = `https://datamall2.mytransport.sg/ltaodataservice/BusServices?$skip=${skip}`;
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const data = await response.json();

            if (data.value.length === 0) break;

            services.push(...data.value.map((Service) => Service.ServiceNo));

            skip += 500;
        } catch (error) {
            console.error(error.message);
            break;
        }
    }

    // Remove duplicates
    services = [...new Set(services)];

    await fs.writeFile(
        "./data/bus-services.json",
        JSON.stringify(services, null, 4)
    );
    console.log(`Saved ${services.length} bus services.`);
}

fetchBusServices();
