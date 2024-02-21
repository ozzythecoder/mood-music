import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import PlaylistsList from "../components/PlaylistsFlatList";
import PlaylistSearch from "../components/PlaylistSearchBar";

export default function Playlists({ navigation }: { navigation: any }) {
    const dispatch = useDispatch();

    useFocusEffect(() => {
        dispatch({ type: "GET_DB_PLAYLISTS" });
    });

    return (
        <SafeAreaView style={styles.safeArea}>
            <PlaylistSearch />
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Your Playlists</Text>
                <Text style={styles.sectionSubTitle}>Select Playlist to View</Text>
            </View>

            <PlaylistsList navigation={navigation} />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingBottom: 50,
    },
    sectionContainer: {
        marginBottom: 10,
        marginTop: 10,
        paddingHorizontal: 10,
    },
    sectionTitle: {
        color: "black",
        fontWeight: "bold",
        fontSize: 20,
    },
    sectionSubTitle: {
        color: "black",
        paddingHorizontal: 10,
    },
});
