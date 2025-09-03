import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import { useEffect } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
} from "react-native-reanimated";

export default function TrainMapModal({ visible, setVisibility }) {
    const offset = useSharedValue({ x: 0, y: 0 });
    const start = useSharedValue({ x: 0, y: 0 });
    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);
    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: offset.value.x },
                { translateY: offset.value.y },
                { scale: scale.value },
            ],
        };
    });

    const panGesture = Gesture.Pan()
        .averageTouches(true)
        .onUpdate((e) => {
            offset.value = {
                x: e.translationX + start.value.x,
                y: e.translationY + start.value.y,
            };
        })
        .onEnd(() => {
            start.value = {
                x: offset.value.x,
                y: offset.value.y,
            };
        });

    const pinchGesture = Gesture.Pinch()
        .onUpdate((event) => {
            scale.value = Math.min(
                Math.max(savedScale.value * event.scale, 1),
                6
            );
        })
        .onEnd(() => {
            savedScale.value = scale.value;
        });

    const composed = Gesture.Simultaneous(panGesture, pinchGesture);

    // Reset map on close
    useEffect(() => {
        if (!visible) {
            offset.value = { x: 0, y: 0 };
            start.value = { x: 0, y: 0 };
            scale.value = 1;
            savedScale.value = 1;
        }
    }, [visible]);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                setVisibility(false);
            }}
        >
            <View style={styles.container}>
                <Text style={styles.title}>System Map</Text>

                <GestureDetector gesture={composed}>
                    <Animated.Image
                        style={[styles.map, animatedStyles]}
                        source={require("../assets/system-map.png")}
                        resizeMode="contain"
                    />
                </GestureDetector>

                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setVisibility(false)}
                >
                    <MaterialIcons name="close" size={28} color="#FFF" />
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "rgba(255,255,255,0.5)",
        backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        position: "absolute",
        top: 50,
        color: "#EE2536",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        zIndex: 1,
    },
    map: {
        flex: 1,
        width: "100%",
    },
    closeButton: {
        position: "absolute",
        bottom: 50,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#EE2536",
        justifyContent: "center",
        alignItems: "center",
    },
});
