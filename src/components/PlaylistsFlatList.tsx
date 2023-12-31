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

const SongList = ({ navigation }: { navigation: any; }) => {
    const dispatch = useDispatch();

    const dbPlaylists = useSelector((store: PlaylistsArrayType) => store.playlists);

    type PlaylistsArrayType = {
        playlists: PlaylistsType[];
    };

    type PlaylistsType = {
        _id: string;
        title: string;
        songs: [string];
    };

    const handleClickPlaylists = (playlists: PlaylistsType) => {
        dispatch({
            type: "SET_CLICKED_PLAYLISTS",
            payload: playlists,
        });
        navigation.navigate("PlaylistsMoodModal");
    };

    const Playlists = ({ playlists }: { playlists: PlaylistsType }) => {
        return (
            <TouchableOpacity onPress={() => handleClickSong(song)}>
                <View style={styles.song}>
                    <View>
                        <Text style={styles.text}>{song.title}</Text>
                        <Text style={styles.subtext}>{song.artist}</Text>
                    </View>
                    <SongMoodList song={song} />
                    <Text>Add Moods</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const renderSong = ({ item }: { item: SongType }) => {
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
        //   if (item.moods && item.moods.some(mood => mood.moodName.toUpperCase().includes(librarySearch.toUpperCase().trim().replace(/\s/g, "")))) {
        //   return <Song song={item} />
        // }
        return null
    };

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={songsDB}
                keyExtractor={(item) => item._id}
                renderItem={(data) => renderSong(data)}
                ListEmptyComponent={<Text>No Current Songs</Text>}
            />
        </View>
    );
};

export default SongList;

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
    song: {
        marginBottom: 5,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
});
