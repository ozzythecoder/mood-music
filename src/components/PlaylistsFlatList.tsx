import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
} from "react-native";
import SongMoodList from "./SongMoodFlatList";

const PlaylistsList = ({ navigation }: { navigation: any; }) => {
    const dispatch = useDispatch();

    const dbPlaylists = useSelector((store: PlaylistsArrayType) => store.playlists);

    type PlaylistsArrayType = {
        playlists: PlaylistType[];
    };

    type PlaylistType = {
        _id: string;
        title: string;
        songs: [string];
    };

    const handleClickPlaylist = (playlist: PlaylistType) => {
        dispatch({
            type: "SET_CLICKED_PLAYLIST",
            payload: playlist,
        });
        navigation.navigate("T O   B E   D E T E R M I N E D");
    };

    const Playlist = ({ playlist }: { playlist: PlaylistType }) => {
        return (
            <TouchableOpacity onPress={() => handleClickPlaylist(playlist)}>
                <View style={styles.playlist}>
                    <View>
                        <Text style={styles.text}>{playlist.title}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const renderPlaylist = ({ item }: { item: PlaylistType }) => {
        if (librarySearch === "") {
            return <Song song={item} />;
        }
        if (
            item.title
                .toUpperCase()
                .includes(librarySearch.toUpperCase().trim().replace(/\s/g, ""))
        ) {
            return <Song song={item} />;
        }
        if (
            item.artist
                .toUpperCase()
                .includes(librarySearch.toUpperCase().trim().replace(/\s/g, ""))
        ) {
            return <Song song={item} />;
        }

        return null
    };

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={dbPlaylists}
                keyExtractor={(item) => item._id}
                renderItem={(data) => renderPlaylist(data)}
                ListEmptyComponent={<Text>No Playlists Saved</Text>}
            />
        </View>
    );
};


const styles = StyleSheet.create({
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
    playlist: {
        marginBottom: 5,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
});



export default PlaylistsList;
