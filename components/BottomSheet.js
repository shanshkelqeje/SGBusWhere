import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from "react-native";

import NextBuses from "./NextBuses";
import BusArrivalScrollView from "./BusArrivalScrollView";

export default function BottomSheet({ stop, nextBuses, arrivalInfo }) {
    // Colours used to indicate bus load; used in conjunction with bus arrival times
    const loadColours = {
        SEA: "#28A745", // Green - Seats Available
        SDA: "#FFC107", // Amber - Standing Available
        LSD: "#DC3545", // Red - Limited Standing
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

                <NextBuses nextBuses={nextBuses} loadColours={loadColours} />

                <View style={styles.lineSeparator}></View>

                <BusArrivalScrollView
                    arrivalInfo={arrivalInfo}
                    loadColours={loadColours}
                />
            </View>
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
