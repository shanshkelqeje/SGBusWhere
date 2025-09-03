import { StyleSheet, Text, View } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function NextBuses({}) {
    return (
        <View style={styles.nextBusesContainer}>
            <View style={styles.nextBusColumn}>
                <View style={styles.nextBusRow}>
                    <MaterialIcons
                        name="directions-bus"
                        size={24}
                        color="#000"
                    />
                    <Text style={styles.nextBusServiceNo}>89</Text>
                </View>
                <Text style={styles.nextBusEstimatedArrival}>Arr</Text>
            </View>

            <View>
                <MaterialIcons
                    name="keyboard-double-arrow-left"
                    size={24}
                    color="black"
                />
            </View>

            <View style={styles.nextBusColumn}>
                <View style={styles.nextBusRow}>
                    <MaterialIcons
                        name="directions-bus"
                        size={24}
                        color="#000"
                    />
                    <Text style={styles.nextBusServiceNo}>81</Text>
                </View>
                <Text style={styles.nextBusEstimatedArrival}>3</Text>
            </View>

            <View>
                <MaterialIcons
                    name="keyboard-double-arrow-left"
                    size={24}
                    color="black"
                />
            </View>

            <View style={styles.nextBusColumn}>
                <View style={styles.nextBusRow}>
                    <MaterialIcons
                        name="directions-bus"
                        size={24}
                        color="#000"
                    />
                    <Text style={styles.nextBusServiceNo}>109</Text>
                </View>
                <Text style={styles.nextBusEstimatedArrival}>5</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    nextBusesContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    nextBusColumn: { alignItems: "center" },
    nextBusRow: {
        flexDirection: "row",
    },
    nextBusServiceNo: { fontSize: 24, fontWeight: "bold" },
    nextBusEstimatedArrival: { fontSize: 20, fontWeight: "bold" },
});
