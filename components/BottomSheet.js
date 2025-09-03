import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from "react-native";

import NextBuses from "./NextBuses";
import BusArrivalScrollView from "./BusArrivalScrollView";

export default function BottomSheet({}) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.stopDescription}>
                    Opp SBST Bedok Nth Depot
                </Text>
                <Text style={styles.stopRoadName}>Bedok Nth Ave 4</Text>
                <Text style={styles.stopCode}>84599</Text>
            </View>

            <View style={styles.lineSeparator}></View>

            <NextBuses />

            <View style={styles.lineSeparator}></View>

            <BusArrivalScrollView />
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
        padding: 24,
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
