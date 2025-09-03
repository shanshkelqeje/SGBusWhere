// Expo SDK
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState, useEffect, useRef, useMemo } from "react";
import * as Location from "expo-location";

// Third-party libraries
import MapView, { Marker } from "react-native-maps";
import haversine from "haversine-distance";

// LTA DataMall
import busStopsData from "./data/bus-stops.json";
import fetchBusArrivals from "./services/fetchBusArrivals.js";

// Assets
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// Components
import BottomSheet from "./components/BottomSheet.js";

export default function App() {
    /** Constants */
    // Coordinates of Singapore
    const initialRegion = {
        latitude: 1.3521,
        longitude: 103.8198,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
    };

    /** State variables */
    const [mapRegion, setMapRegion] = useState(initialRegion);
    const [userRegion, setUserRegion] = useState(initialRegion);
    const [locationPermission, setLocationPermission] = useState(false);
    const [refreshCounter, setRefreshCounter] = useState(0);

    const mapRef = useRef(null);

    // Recenters the viewable region to the user's location
    const recenterMap = () => {
        setMapRegion(userRegion);
        mapRef.current.animateToRegion(userRegion, 500);
    };

    // Request for the user to grant location permissions while app is in foreground; default to initialRegion otherwise
    useEffect(() => {
        async function getCurrentLocation() {
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") return;

            let location = await Location.getCurrentPositionAsync();

            let region = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            };

            setMapRegion(region);
            setUserRegion(region);
            setLocationPermission(true);

            mapRef.current.animateToRegion(region, 1000);
        }

        getCurrentLocation();
    }, []);

    // Display bus stop markers closest to user
    const [selectedStop, setSelectedStop] = useState(null);
    const [arrivalInfo, setArrivalInfo] = useState([]);

    const getClosestMarkers = (stops, region, limit) => {
        return stops
            .map((stop) => ({
                ...stop,
                distance: haversine(
                    { latitude: region.latitude, longitude: region.longitude },
                    { latitude: stop.Latitude, longitude: stop.Longitude }
                ),
            }))
            .sort((a, b) => a.distance - b.distance)
            .slice(0, limit);
    };

    const visibleMarkers = useMemo(
        () => getClosestMarkers(busStopsData, mapRegion, 20),
        [mapRegion]
    );

    // Fetch bus arrival info for the selected bus stop
    useEffect(() => {
        if (!selectedStop) return;
        fetchBusArrivals(selectedStop.BusStopCode).then(setArrivalInfo);
    }, [selectedStop]);

    // Get the next arriving buses
    const getNextBuses = (arrivalInfo) => {
        if (!selectedStop) return;

        const nextBuses = arrivalInfo.flatMap((bus) =>
            bus.NextBuses.filter(
                (nextBus) => nextBus.EstimatedArrival !== "-"
            ).map((nextBus) => {
                let sortValue;

                if (nextBus.EstimatedArrival === "Arr") {
                    sortValue = 0;
                }

                return {
                    ServiceNo: bus.ServiceNo,
                    EstimatedArrival: nextBus.EstimatedArrival,
                    Load: nextBus.Load,
                    sortValue,
                };
            })
        );

        nextBuses.sort((a, b) => a.sortValue - b.sortValue);

        return nextBuses.slice(0, 3);
    };

    const nextBuses = getNextBuses(arrivalInfo);

    return (
        <View style={styles.container}>
            {/* Recenter Button */}
            <TouchableOpacity
                style={styles.recenterButton}
                onPress={recenterMap}
            >
                <MaterialIcons name="my-location" size={28} color="#EE2536" />
            </TouchableOpacity>

            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={initialRegion}
                onRegionChangeComplete={(newRegion) => {
                    setMapRegion(newRegion);
                    setRefreshCounter(refreshCounter + 1);
                }}
                showsCompass={false}
            >
                {/* User Marker */}
                {locationPermission && (
                    <Marker
                        coordinate={{
                            latitude: userRegion.latitude,
                            longitude: userRegion.longitude,
                        }}
                        title="You"
                    >
                        <MaterialIcons
                            name="location-pin"
                            size={36}
                            color="#EE2536"
                        />
                    </Marker>
                )}

                {/* Bus Stop Markers */}
                {visibleMarkers.map((stop) => {
                    const isSelected =
                        selectedStop?.BusStopCode === stop.BusStopCode;
                    return (
                        <Marker
                            key={`${stop.BusStopCode}-${refreshCounter}`}
                            coordinate={{
                                latitude: stop.Latitude,
                                longitude: stop.Longitude,
                            }}
                            onPress={() => {
                                setSelectedStop(stop);
                            }}
                        >
                            <MaterialIcons
                                name="directions-bus"
                                size={24}
                                color={isSelected ? "#EE2536" : "#555"}
                            />
                        </Marker>
                    );
                })}
            </MapView>

            {selectedStop && (
                <BottomSheet
                    stop={selectedStop}
                    nextBuses={nextBuses}
                    arrivalInfo={arrivalInfo}
                />
            )}

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#555",
        alignItems: "center",
        justifyContent: "center",
    },
    map: {
        width: "100%",
        height: "100%",
    },
    recenterButton: {
        zIndex: 1,
        position: "absolute",
        right: "5%",
        backgroundColor: "#FFF",
        alignSelf: "flex-end",
        padding: 16,
        borderRadius: 50,
    },
});
