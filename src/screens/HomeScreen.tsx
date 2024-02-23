import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import SpotifySearch from "../components/Spotify/SpotifySearch";
import SpotifyAccessToken from "../components/Spotify/SpotifyAccessToken";
import MoodButtons from "../components/MoodButtons";

import { Typography, Gradients } from "../styles";
import { LinearGradient } from "react-native-linear-gradient";

const HomeScreen = ({ navigation }: { navigation: any }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: "GET_DB_SONGS" });
    }, []);

    useFocusEffect(() => {
        dispatch({ type: "GET_MOODS" });
    });

    return (
        <View style={styles.safeArea}>
            <LinearGradient
                {...Gradients.cloudCity}
                style={styles.gradient}
            >
                <View style={styles.greeting}>
                    <Text style={styles.heading}>HELLO!</Text>
                    <Text style={styles.subheading}>How are you feeling?</Text>
                </View>
                <MoodButtons navigation={navigation} />
                <SpotifyAccessToken />
                <SpotifySearch navigation={navigation} />
            </LinearGradient>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    greeting: {
        alignItems: "center",
        justifyContent: "center",
        margin: 20,
        padding: 10,
    },
    heading: {
        ...Typography.heading1,
    },
    subheading: {
        ...Typography.heading2,
    },
});
