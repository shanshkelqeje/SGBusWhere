import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useState } from "react";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function SearchBar({ services }) {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (input) => {
        setQuery(input);

        if (input.trim() === "") {
            setSearchResults([]);
            return;
        }

        const results = services.filter((serviceNo) =>
            serviceNo.toLowerCase().startsWith(input.toLowerCase())
        );

        setSearchResults(results);
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <View style={styles.searchBar}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Enter Bus / Stop No."
                        value={query}
                        onChangeText={handleSearch}
                    />
                    {query ? (
                        <TouchableOpacity
                            onPress={() => {
                                setQuery("");
                                setSearchResults([]);
                            }}
                        >
                            <MaterialIcons
                                style={styles.searchIcon}
                                name="cancel"
                                size={28}
                                color="#555"
                            />
                        </TouchableOpacity>
                    ) : (
                        <MaterialIcons name="search" size={28} color="#555" />
                    )}
                </View>
            </View>

            {searchResults.length > 0 && (
                <FlatList
                    style={styles.results}
                    data={searchResults}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.item}
                            onPress={() => {}}
                        >
                            {/* <MaterialCommunityIcons
                                style={styles.resultIcon}
                                name="bus-stop"
                                size={28}
                                color="#555"
                            /> */}
                            <MaterialCommunityIcons
                                style={styles.resultIcon}
                                name="bus"
                                size={24}
                                color="#555"
                            />
                            <Text style={styles.resultText}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.resultsContainer}
                ></FlatList>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        zIndex: 2,
        flex: 1,
        width: "100%",
        alignItems: "center",
        backgroundColor: "#FFF",
    },
    searchBarContainer: {
        width: "90%",
        paddingTop: 50,
    },
    searchBar: {
        backgroundColor: "#EEE",
        flexDirection: "row",
        alignItems: "center",
        height: 48,
        borderRadius: 50,
        paddingHorizontal: 20,
    },
    searchInput: {
        flex: 1,
        fontSize: 20,
    },
    searchIcon: {
        marginLeft: 16,
    },
    results: {
        flex: 1,
        width: "100%",
        height: "100%",
        marginTop: 8,
    },
    resultsContainer: {},
    item: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 32,
    },
    resultIcon: {
        marginHorizontal: 32,
    },
    resultText: {
        flex: 1,
        paddingVertical: 16,
        fontSize: 24,
        fontWeight: "bold",
        borderBottomWidth: 1,
        borderBottomColor: "#DDD",
    },
});
