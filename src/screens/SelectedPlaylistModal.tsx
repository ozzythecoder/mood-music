import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, FlatList, Switch, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import SongMoodList from "../components/SongMoodFlatList";


// import { PlaylistType } from "../components/PlaylistsFlatList";
import { SongType } from "../components/SongFlatList";

export type PlaylistType = {
    _id: string;
    title: string;
    songs: [string];
};

type StoreType = {
    selectedPlaylist: PlaylistType;
};



const SelectedPlaylistModal = ({ navigation }: { navigation: any }) => {
    const dispatch = useDispatch();

    const selectedPlaylist = useSelector((store: StoreType) => store.selectedPlaylist);


    useEffect(() => {
        navigation.setOptions({ title: selectedPlaylist.title })

    }, []);



    const Song = ({ song }: { song: SongType }) => {
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

    const renderSong = ({ item }: { item: SongType }) => {

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
    mood: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderBottomColor: "grey",
        borderBottomWidth: 1,
    },
    button: {
        backgroundColor: "green",
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
    container: {
        alignItems: "center",
    },
    list: {
        width: "90%",
    },
    text: {
        color: "black",
        fontWeight: "bold",
    },
    subtext: {
        color: "black",
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
    trackInfo: {
        flex: 1,
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
