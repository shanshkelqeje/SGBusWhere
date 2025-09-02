/** Fetches real-time arrival information for bus services at a queried bus stop */
export default async function fetchBusArrivals(BusStopCode) {
    const options = {
        headers: { AccountKey: process.env.LTA_DATAMALL_API_KEY },
    };

    try {
        const url = `https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=${BusStopCode}`;
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error.message);
        return [];
    }
}
