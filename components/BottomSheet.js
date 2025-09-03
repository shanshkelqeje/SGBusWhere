import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";

import NextBuses from "./NextBuses.js";
import BusArrivalScrollView from "./BusArrivalScrollView.js";
import BusRouteModal from "./BusRouteModal.js";

import fetchBusArrivals from "../services/fetchBusArrivals.js";
import busRoutesData from "../data/bus-routes.json";

export default function BottomSheet({ stop }) {
    // Colours used to indicate bus load; used in conjunction with bus arrival times
    const loadColours = {
        SEA: "#28A745", // Green - Seats Available
        SDA: "#FFC107", // Amber - Standing Available
        LSD: "#DC3545", // Red - Limited Standing
    };

    const [arrivalInfo, setArrivalInfo] = useState([]);

    // Fetch bus arrival info for the selected bus stop
    useEffect(() => {
        if (!stop) return;
        fetchBusArrivals(stop.BusStopCode).then(setArrivalInfo);
    }, [stop]);

    const [busRoute, setBusRoute] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const openBusRouteModal = (busStopCode, serviceNo) => {
        const route = busRoutesData.find(
            (route) =>
                route.BusStopCode === busStopCode &&
                route.ServiceNo === serviceNo
        );

        setBusRoute(route);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <View style={styles.topBar}></View>
            <View style={styles.content}>
                <View>
                    <Text style={styles.stopDescription}>
                        {stop.Description}
                    </Text>
                    <Text style={styles.stopRoadName}>{stop.RoadName}</Text>
                    <Text style={styles.stopCode}>{stop.BusStopCode}</Text>
                </View>

                <View style={styles.lineSeparator}></View>

                <NextBuses
                    arrivalInfo={arrivalInfo}
                    loadColours={loadColours}
                    getBusRoute={(serviceNo) =>
                        openBusRouteModal(stop.BusStopCode, serviceNo)
                    }
                />

                <View style={styles.lineSeparator}></View>

                {stop && (
                    <BusArrivalScrollView
                        arrivalInfo={arrivalInfo}
                        loadColours={loadColours}
                        getBusRoute={(serviceNo) =>
                            openBusRouteModal(stop.BusStopCode, serviceNo)
                        }
                    />
                )}
            </View>

            {busRoute && (
                <BusRouteModal
                    visible={modalVisible}
                    setVisibility={setModalVisible}
                    stop={stop}
                    route={busRoute}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "45%",
        backgroundColor: "#FFF",
    },
    topBar: {
        height: 40,
        width: "100%",
        backgroundColor: "#DDD",
        borderWidth: 0,
        borderBottomWidth: 5,
        borderBottomColor: "#EE2536",
    },
    content: {
        padding: 24,
        paddingVertical: 16,
    },
    stopDescription: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
    },
    stopRoadName: {
        fontSize: 16,
        color: "#777",
        marginBottom: 8,
    },
    stopCode: {
        fontSize: 16,
        color: "#555",
        marginBottom: 8,
    },
    lineSeparator: {
        height: 1,
        backgroundColor: "#DDD",
        marginVertical: 16,
    },
});
