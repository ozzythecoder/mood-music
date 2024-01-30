import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SafeAreaView, StyleSheet } from "react-native";
import NewPlaylist from "../components/NewPlaylistFlatList";
import CreatePlaylistButton from "../components/CreatePlaylistButton";
import PlaylistForm from "../components/PlaylistForm";
import SavePlaylistButton from "../components/SavePlaylistButton";
import { ScrollView } from "react-native-gesture-handler";
import type { ClickedMoodType } from "@src/definitions";

export default function NewPlaylistScreen({ navigation }: { navigation: any }) {
    const clickedMood = useSelector(
        (store: ClickedMoodType) => store.clickedMood,
    );
    const [playlistTitle, setPlaylistTitle] = useState("");
    const [playlistDescription, setPlaylistDescription] = useState("");

    return (
        <SafeAreaView style={styles.safeArea}>

            {/* playback control buttons eventually? */}

            {/* flatlist with the playlist
    needs re-regenerate switch */}
            <NewPlaylist />
            {/* re-generate button */}
            <ScrollView>
                <CreatePlaylistButton clickedMood={clickedMood} />
                {/* title your playlist field  */}
                <PlaylistForm
                    playlistTitle={playlistTitle}
                    setPlaylistTitle={setPlaylistTitle}
                    playlistDescription={playlistDescription}
                    setPlaylistDescription={setPlaylistDescription}
                />
                {/* save button */}
                <SavePlaylistButton
                    playlistTitle={playlistTitle}
                    playlistDescription={playlistDescription}
                    navigation={navigation}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
});
