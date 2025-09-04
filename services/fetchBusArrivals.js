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

        const buses = data.Services.map((Service) => ({
            ServiceNo: Service.ServiceNo,
            NextBuses: [
                Service.NextBus,
                Service.NextBus2,
                Service.NextBus3,
            ].map((bus) => {
                if (!bus.EstimatedArrival)
                    return {
                        EstimatedArrival: "-",
                        Load: bus.Load,
                        Feature: bus.Feature,
                        Type: bus.Type,
                    };

                const difference = new Date(bus.EstimatedArrival) - new Date();
                const minutes = Math.max(Math.floor(difference / 60000), 0);

                return {
                    EstimatedArrival: minutes < 1 ? "Arr" : `${minutes}`,
                    Load: bus.Load,
                    Feature: bus.Feature,
                    Type: bus.Type,
                };
            }),
        }));

        return buses;
    } catch (error) {
        console.error(error.message);
        return [];
    }
}
