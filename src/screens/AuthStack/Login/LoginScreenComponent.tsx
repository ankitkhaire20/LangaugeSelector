import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const BasicAnimation = () => {
    // Create a shared value to control the horizontal position
    const translateX = useSharedValue(0);

    // Create an animated style that depends on the shared value
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    // Function to start the animation
    const startAnimation = () => {
        // Update the shared value with an animation
        translateX.value = withTiming(translateX.value === 0 ? 150 : 0, { duration: 500 });
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.box, animatedStyle]} />
            <Button title="Move Box" onPress={startAnimation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        width: 100,
        height: 100,
        backgroundColor: 'tomato',
    },
});

export default BasicAnimation;
