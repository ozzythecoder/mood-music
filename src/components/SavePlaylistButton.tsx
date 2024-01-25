import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import type { Song, NewPlaylistType } from "@src/definitions";

const SavePlaylistButton = ({
    playlistTitle,
    playlistDescription,
    navigation,
}: {
    playlistTitle: string;
    playlistDescription: string;
    navigation: any;
}) => {
    const newPlaylist = useSelector(
        (store: NewPlaylistType) => store.newPlaylist,
    );
    const dispatch = useDispatch();

    const handleSavePlaylist = (
        playlistTitle: string,
        playlistDescription: string,
        newPlaylist: Song[],
    ) => {
        const playlist = { playlistTitle, playlistDescription, newPlaylist };
        dispatch({
            type: "SAVE_PLAYLIST",
            payload: playlist,
        });
        navigation.navigate("Saved Playlists");
    };

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() =>
                handleSavePlaylist(playlistTitle, playlistDescription, newPlaylist)}
        >
            <Text style={styles.buttonText}>Save Playlist</Text>
        </TouchableOpacity>
    );
};

export default SavePlaylistButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: "blue",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderRadius: 6,
        margin: 10,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
});
