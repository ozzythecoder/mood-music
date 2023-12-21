import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const LoginScreen = () => {
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
    )
};

const styles = StyleSheet.create({
    spotify: {
        margin: 5,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    topText: {
        color: 'black',
        margin: 5,
        padding: 10,
        borderRadius: 5,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#1db954',
        padding: 10,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        display: 'flex',
        flexDirection: 'row',
    }
})

export default LoginScreen;