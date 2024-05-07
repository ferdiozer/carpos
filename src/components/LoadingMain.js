import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
const { height, width } = Dimensions.get("screen");
export default function Loading() {
    return (
        <View style={styles.container}>
            <LottieView
                source={require('./assets/Lottle/Animation1714734041534.json')}
                autoPlay
                loop
                style={styles.loading}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loading: {
        width: width,
        height: height,
    },
});