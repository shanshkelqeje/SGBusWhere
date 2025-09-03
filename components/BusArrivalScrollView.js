import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from "react-native";

export default function BusArrivalScrollView({}) {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.serviceNo}>89</Text>
                <Text style={styles.estimatedArrival}>Arr</Text>
                <Text style={styles.estimatedArrival}>3</Text>
                <Text style={styles.estimatedArrival}>11</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.serviceNo}>81</Text>
                <Text style={styles.estimatedArrival}>1</Text>
                <Text style={styles.estimatedArrival}>3</Text>
                <Text style={styles.estimatedArrival}>5</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.serviceNo}>109</Text>
                <Text style={styles.estimatedArrival}>7</Text>
                <Text style={styles.estimatedArrival}>11</Text>
                <Text style={styles.estimatedArrival}>-</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.serviceNo}>291</Text>
                <Text style={styles.estimatedArrival}>3</Text>
                <Text style={styles.estimatedArrival}>5</Text>
                <Text style={styles.estimatedArrival}>5</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.serviceNo}>109M</Text>
                <Text style={styles.estimatedArrival}>2</Text>
                <Text style={styles.estimatedArrival}>14</Text>
                <Text style={styles.estimatedArrival}>21</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { marginBottom: 16 },
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
