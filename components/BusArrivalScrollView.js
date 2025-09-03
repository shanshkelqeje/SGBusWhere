import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from "react-native";

export default function BusArrivalScrollView({ arrivalInfo, loadColours }) {
    return (
        <ScrollView style={styles.container}>
            {arrivalInfo.map((bus) => (
                <View style={styles.row} key={bus.ServiceNo}>
                    <Text style={styles.serviceNo}>{bus.ServiceNo}</Text>
                    {bus.NextBuses.map((nextBus, index) => (
                        <Text
                            style={[
                                styles.estimatedArrival,
                                { color: loadColours[nextBus.Load] || "#555" },
                            ]}
                            key={index}
                        >
                            {nextBus.EstimatedArrival}
                        </Text>
                    ))}
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { maxHeight: "45%" },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginBottom: 16,
    },
    serviceNo: {
        width: 80,
        fontSize: 24,
        fontWeight: "bold",
    },
    estimatedArrival: {
        width: 40,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
});
