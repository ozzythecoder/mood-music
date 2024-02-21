import React from "react";
import {useEffect } from "react";
import { useSelector } from "react-redux";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import SongMoodList from "../components/SongMoodFlatList";
import type { Song, Playlist } from "@src/definitions";

type StoreType = {
    selectedPlaylist: Playlist;
};

const SelectedPlaylistModal = ({ navigation }: { navigation: any }) => {

    const selectedPlaylist = useSelector((store: StoreType) => store.selectedPlaylist);

    useEffect(() => {
        navigation.setOptions({ title: selectedPlaylist.title });
    }, []);

    const Song = ({ song }: { song: Song }) => {
        return (
            <View style={styles.entry}>
                <View style={styles.songInfo}>
                    {song.image.length > 0 ? (
                        <Image
                            style={styles.albumThumbnail}
                            source={{ uri: song.image }}
                        />
                    ) : (
                        <View style={styles.placeholderImage} />
                    )}
                    <View>
                        <Text style={styles.trackName}>{song.title}</Text>
                        <Text style={styles.artistName}>{song.artists}</Text>
                        <Text style={styles.albumName}>{song.album}</Text>
                    </View>
                </View>

                <View style={styles.moodView}>
                    <SongMoodList song={song} />
                    <Text>Add Moods</Text>
                </View>
            </View>
        );
    };

    const renderSong = ({ item }: { item: Song }) => {
        return <Song song={item} />;
    };

    return (
        <View>
            <FlatList
                style={styles.list}
                data={selectedPlaylist}
                keyExtractor={(item) => item._id}
                renderItem={(data) => renderSong(data)}
                ListEmptyComponent={<Text>No Playlists Saved</Text>}
            />
        </View>
    );
};

export default SelectedPlaylistModal;

const styles = StyleSheet.create({

    list: {
        width: "90%",
    },
    entry: {
        marginBottom: 10,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    songInfo: {
        flexDirection: "row",
        maxWidth: "60%",
    },
    moodView: {
        paddingTop: 5,
        maxWidth: "30%",
    },
    albumThumbnail: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 10,
    },
    trackName: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#111",
        marginBottom: 4,
    },
    artistName: {
        fontSize: 12,
        color: "#555",
    },
    albumName: {
        fontSize: 10,
        color: "#777",
    },
    placeholderImage: {
        width: 50,
        height: 50,
        borderRadius: 20,
        backgroundColor: "#ddd",
    },
});
