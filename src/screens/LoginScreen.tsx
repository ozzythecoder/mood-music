import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

import * as AppAuth from "expo-app-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
    async function authenticate() {
        const config: any = {
            issuer: "https://accounts.spotify.com",
            clientID: "e6eaf8e16a0048dea2c2751759d59ea3",
            scopes: [
                "user-read-email",
                "user-library-read",
                "user-read-recently-played",
                "user-top-read",
                "playlist-read-private",
                "playlist-read-collaborative",
                "playlist-modify-public",
            ],
            redirectUrl: "exp://localhost:19002/--/spotify-auth-callback",
        };
        const result = await AppAuth.authAsync(config);
        console.log(result);
        if (result.accessToken) {
            const expirationDate = new Date(result.accessTokenExpirationDate).getTime();
            AsyncStorage;
        }
    }

    return (
        <View>
            <View style={styles.spotify}>
                <Entypo style={{ textAlign: "center" }} name="spotify" size={60} color="black" />
                <Text style={styles.topText}>
                    Sign-in to your Spotify account below:
                </Text>
            </View>
            <View>
                <TouchableOpacity style={styles.button}>
                    <Entypo name="spotify" size={30} color="black" />
                    <Text style={styles.topText}>
                        Sign in using Spotify
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    spotify: {
        margin: 5,
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    topText: {
        color: "black",
        margin: 5,
        padding: 10,
        borderRadius: 5,
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "#1db954",
        padding: 10,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        margin: 20,
        display: "flex",
        flexDirection: "row",
    },
});

export default LoginScreen;
