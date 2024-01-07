import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";



type PlaylistsArrayType = {
    playlists: PlaylistType[];
};

export type PlaylistType = {
    _id: string;
    title: string;
    songs: [string];
};


const PlaylistsList = ({ navigation }: { navigation: any; }) => {
    const dispatch = useDispatch();

    const dbPlaylists = useSelector((store: PlaylistsArrayType) => store.playlists);


    const handleClickPlaylist = (playlist: PlaylistType) => {
        dispatch({
            type: "GET_SELECTED_PLAYLIST_SONGS",
            payload: playlist,
        });
        navigation.navigate("SelectedPlaylistModal");
    };

    const Playlist = ({ playlist }: { playlist: PlaylistType }) => {
        return (
            <TouchableOpacity onPress={() => handleClickPlaylist(playlist)}>
                <View style={styles.playlist}>
                    <View>
                        <Text style={styles.text}>{playlist.title}</Text>
                        <Text style={styles.subtext}>{playlist.description}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const renderPlaylist = ({ item }: { item: PlaylistType }) => {

        return <Playlist playlist={item} />;

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
        marginHorizontal: 10,
    },
    playlist: {
        marginBottom: 5,
        marginTop: 5,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
});



export default PlaylistsList;
