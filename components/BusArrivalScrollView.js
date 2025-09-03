import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from "react-native";

export default function BusArrivalScrollView({
    arrivalInfo,
    loadColours,
    getBusRoute,
}) {
    return (
        <View style={styles.container}>
            <ScrollView>
                {arrivalInfo.map((bus) => (
                    <View style={styles.row} key={bus.ServiceNo}>
                        <TouchableOpacity
                            onPress={() => {
                                getBusRoute(bus.ServiceNo);
                            }}
                        >
                            <Text style={styles.serviceNo}>
                                {bus.ServiceNo}
                            </Text>
                        </TouchableOpacity>
                        {bus.NextBuses.map((nextBus, index) => (
                            <Text
                                style={[
                                    styles.estimatedArrival,
                                    {
                                        color:
                                            loadColours[nextBus.Load] || "#555",
                                    },
                                ]}
                                key={index}
                            >
                                {nextBus.EstimatedArrival}
                            </Text>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { maxHeight: "45%" },
    row: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginBottom: 16,
    },
    serviceNo: {
        minWidth: 80,
        fontSize: 24,
        fontWeight: "bold",
    },
    estimatedArrival: {
        minWidth: 40,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
});
