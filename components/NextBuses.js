import React from "react";
import { StyleSheet, Text, View } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function NextBuses({ nextBuses, loadColours }) {
    return (
        <View style={styles.nextBusesContainer}>
            {nextBuses.map((nextBus, index) => (
                <React.Fragment key={index}>
                    <View style={styles.nextBusColumn} key={index}>
                        <View style={styles.nextBusRow}>
                            <MaterialIcons
                                name="directions-bus"
                                size={20}
                                color="#000"
                            />
                            <Text style={styles.nextBusServiceNo}>
                                {nextBus.ServiceNo}
                            </Text>
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
