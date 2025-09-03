import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function NextBuses({ arrivalInfo, loadColours, getBusRoute }) {
    // Get the next arriving buses
    const getNextBuses = (arrivalInfo) => {
        const nextBuses = arrivalInfo.flatMap((bus) =>
            bus.NextBuses.filter(
                (nextBus) => nextBus.EstimatedArrival !== "-"
            ).map((nextBus) => ({
                ServiceNo: bus.ServiceNo,
                EstimatedArrival: nextBus.EstimatedArrival,
                Load: nextBus.Load,
                Feature: nextBus.Feature,
                Type: nextBus.Type,
            }))
        );

        nextBuses.sort((a, b) => a.EstimatedArrival - b.EstimatedArrival);

        return nextBuses.slice(0, 3);
    };

    const nextBuses = getNextBuses(arrivalInfo);

    return (
        <View style={styles.nextBusesContainer}>
            {nextBuses.map((nextBus, index) => (
                <React.Fragment key={index}>
                    <View style={styles.nextBusColumn}>
                        <View style={styles.nextBusRow}>
                            <MaterialIcons
                                name="directions-bus"
                                size={20}
                                color="#000"
                            />
                            <TouchableOpacity
                                onPress={() => getBusRoute(nextBus.ServiceNo)}
                            >
                                <Text style={styles.nextBusServiceNo}>
                                    {nextBus.ServiceNo}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Text
                            style={[
                                styles.nextBusEstimatedArrival,
                                { color: loadColours[nextBus.Load] || "#555" },
                            ]}
                        >
                            {nextBus.EstimatedArrival}
                        </Text>
                    </View>
                    {index < nextBuses.length - 1 && (
                        <MaterialIcons
                            name="keyboard-double-arrow-left"
                            size={24}
                            color="black"
                        />
                    )}
                </React.Fragment>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    nextBusesContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    nextBusColumn: {
        alignItems: "center",
    },
    nextBusRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    nextBusServiceNo: {
        fontSize: 24,
        fontWeight: "bold",
    },
    nextBusEstimatedArrival: {
        fontSize: 20,
        fontWeight: "bold",
    },
});
