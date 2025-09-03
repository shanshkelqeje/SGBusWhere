import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";

export default function BusRouteModal({ modalVisible, setModalVisible }) {
    return (
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.serviceNo}>291</Text>
                        <View style={styles.verticalLineSeparator} />
                        <View>
                            <Text style={styles.stopDescription}>
                                Opp Blk 865
                            </Text>
                            <Text style={styles.stopRoadName}>
                                Tampines St 83
                            </Text>
                            <Text style={styles.stopCode}>75102</Text>
                        </View>
                    </View>

                    <View style={styles.horizontalLineSeperator} />

                    <View style={styles.table}>
                        <View style={styles.tableHeader}>
                            <Text style={styles.tableRowHeader}></Text>
                            <Text style={styles.tableRowHeader}>First Bus</Text>
                            <Text style={styles.tableRowHeader}>Last Bus</Text>
                        </View>

                        <View style={styles.tableRow}>
                            <Text style={styles.tableColumnHeader}>
                                Weekdays
                            </Text>
                            <Text style={styles.tableCell}>2020</Text>
                            <Text style={styles.tableCell}>0007</Text>
                        </View>

                        <View style={styles.tableRow}>
                            <Text style={styles.tableColumnHeader}>
                                Saturdays
                            </Text>
                            <Text style={styles.tableCell}>1435</Text>
                            <Text style={styles.tableCell}>0013</Text>
                        </View>

                        <View style={styles.tableRow}>
                            <Text style={styles.tableColumnHeader}>
                                Sundays
                            </Text>
                            <Text style={styles.tableCell}>0645</Text>
                            <Text style={styles.tableCell}>0011</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => {
                            setModalVisible(false);
                        }}
                    >
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(0,0,0,0.5)",
        flex: 1,
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
    horizontalLineSeperator: {
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
        width: 80,
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
