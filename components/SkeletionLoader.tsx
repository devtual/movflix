import React, { useEffect } from "react";
import { View, Animated, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const SkeletonLoader = ({ width, height, borderRadius = 10 }: any) => {
    const shimmerAnim = new Animated.Value(0);

    useEffect(() => {
        Animated.loop(
            Animated.timing(shimmerAnim, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const shimmerTranslate = shimmerAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-width, width],
    });

    return (
        <View style={[styles.skeleton, { width, height, borderRadius }]}>
            <Animated.View
                style={[
                    styles.shimmer,
                    { transform: [{ translateX: shimmerTranslate }] },
                ]}
            >
                <LinearGradient
                    colors={["#2a2a2a", "#3b3b3b", "#2a2a2a"]}
                    start={[0, 0]}
                    end={[1, 0]}
                    style={styles.gradient}
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    skeleton: {
        backgroundColor: "#1c1c1c",
        overflow: "hidden",
        position: "relative",
    },
    shimmer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "100%",
    },
    gradient: {
        flex: 1,
        width: "100%",
    },
});

export default SkeletonLoader;
