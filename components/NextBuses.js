import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import BusRouteModal from "./BusRouteModal.js";

export default function NextBuses({
    nextBuses,
    loadColours,
    modalVisible,
    setModalVisible,
}) {
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
                            <TouchableOpacity
                                onPress={() => {
                                    setModalVisible(true);
                                }}
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

            <BusRouteModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
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
