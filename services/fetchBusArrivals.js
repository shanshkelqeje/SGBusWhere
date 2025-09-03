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
                {
                    EstimatedArrival: Service.NextBus.EstimatedArrival,
                    Load: Service.NextBus.Load,
                    Feature: Service.NextBus.Feature,
                    Type: Service.NextBus.Type,
                },
                {
                    EstimatedArrival: Service.NextBus2.EstimatedArrival,
                    Load: Service.NextBus2.Load,
                    Feature: Service.NextBus2.Feature,
                    Type: Service.NextBus2.Type,
                },
                {
                    EstimatedArrival: Service.NextBus3.EstimatedArrival,
                    Load: Service.NextBus3.Load,
                    Feature: Service.NextBus3.Feature,
                    Type: Service.NextBus3.Type,
                },
            ].map((bus) => {
                if (!bus.EstimatedArrival) return { EstimatedArrival: "-" };

                const difference = new Date(bus.EstimatedArrival) - new Date();
                const minutes = Math.max(Math.floor(difference / 60000), 0);

                let estimatedArrivalTime;

                if (minutes < 1) estimatedArrivalTime = "Arr";
                else estimatedArrivalTime = `${minutes}`;

                return {
                    EstimatedArrival: estimatedArrivalTime,
                    Load: bus.Load,
                };
            }),
        }));

        return buses;
    } catch (error) {
        console.error(error.message);
        return [];
    }
}
