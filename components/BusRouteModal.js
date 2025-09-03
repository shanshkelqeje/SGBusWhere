import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
} from "react-native";

export default function BusRouteModal({ visible, setVisibility, stop, route }) {
    return (
        <Modal animationType="fade" transparent={true} visible={visible}>
            <TouchableWithoutFeedback onPress={() => setVisibility(false)}>
                <View style={styles.container}>
                    <TouchableWithoutFeedback>
                        <View style={styles.content}>
                            <View style={styles.header}>
                                <Text style={styles.serviceNo}>
                                    {route.ServiceNo}
                                </Text>
                                <View style={styles.verticalLineSeparator} />
                                <View>
                                    <Text style={styles.stopDescription}>
                                        {stop.Description}
                                    </Text>
                                    <Text style={styles.stopRoadName}>
                                        {stop.RoadName}
                                    </Text>
                                    <Text style={styles.stopCode}>
                                        {stop.BusStopCode}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.horizontalLineSeparator} />

                            <View style={styles.table}>
                                <View style={styles.tableHeader}>
                                    <Text style={styles.tableRowHeader}></Text>
                                    <Text style={styles.tableRowHeader}>
                                        First Bus
                                    </Text>
                                    <Text style={styles.tableRowHeader}>
                                        Last Bus
                                    </Text>
                                </View>

                                <View style={styles.tableRow}>
                                    <Text style={styles.tableColumnHeader}>
                                        Weekdays
                                    </Text>
                                    <Text style={styles.tableCell}>
                                        {route.WD_FirstBus}
                                    </Text>
                                    <Text style={styles.tableCell}>
                                        {route.WD_LastBus}
                                    </Text>
                                </View>

                                <View style={styles.tableRow}>
                                    <Text style={styles.tableColumnHeader}>
                                        Saturdays
                                    </Text>
                                    <Text style={styles.tableCell}>
                                        {route.SAT_FirstBus}
                                    </Text>
                                    <Text style={styles.tableCell}>
                                        {route.SAT_LastBus}
                                    </Text>
                                </View>

                                <View style={styles.tableRow}>
                                    <Text style={styles.tableColumnHeader}>
                                        Sundays
                                    </Text>
                                    <Text style={styles.tableCell}>
                                        {route.SUN_FirstBus}
                                    </Text>
                                    <Text style={styles.tableCell}>
                                        {route.SUN_LastBus}
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => {
                                    setVisibility(false);
                                }}
                            >
                                <Text style={styles.closeButtonText}>
                                    Close
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        width: "75%",
        backgroundColor: "#FFF",
        borderRadius: 10,
        margin: 32,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: 32,
    },
    serviceNo: {
        fontSize: 36,
        fontWeight: "bold",
    },
    verticalLineSeparator: {
        width: 3,
        backgroundColor: "#EE2536",
        marginHorizontal: 16,
        alignSelf: "stretch",
    },
    stopDescription: {
        fontSize: 20,
        marginBottom: 8,
    },
    stopRoadName: {
        fontSize: 16,
        color: "#777",
        marginBottom: 8,
    },
    stopCode: {
        fontSize: 16,
    },
    horizontalLineSeparator: {
        height: 3,
        backgroundColor: "#BBB",
    },
    table: {
        padding: 32,
        backgroundColor: "#DDD",
    },
    tableHeader: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#EE2536",
        paddingBottom: 8,
        marginBottom: 8,
    },
    tableRowHeader: {
        flex: 1,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
    },
    tableColumnHeader: {
        minWidth: 80,
        fontSize: 16,
        fontWeight: "bold",
    },
    tableRow: {
        flexDirection: "row",
        paddingVertical: 4,
    },
    tableCell: {
        flex: 1,
        textAlign: "center",
        fontSize: 16,
    },
    closeButton: {
        padding: 16,
        backgroundColor: "#EE2536",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: "center",
    },
    closeButtonText: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "bold",
    },
});
