import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
} from "react-native";
import Playlist from "../components/Playlist";



// Note: for real data title should be determined by mood name
const dummyPlaylistData = [
    { title: "Happy Playlist", blurb: "For the bad days" },
    { title: "Nostalgic Playlist", blurb: "For reminiscing" },
    { title: "Energetic Playlist", blurb: "For getting up that hill" },
    { title: "Angry Playlist", blurb: "For when jobs don't call back" },
];

export default function Playlists({ navigation }) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View>
                <Text>Search Bar Here</Text><Text>Create Playlist Btn Here</Text>
            </View>
            <FlatList
                data={dummyPlaylistData}
                keyExtractor={(item) => item.title}
                renderItem={(data) => (<>
                    <Playlist playlist={data.item} title={data.item.title} blurb={data.item.blurb} navigation={navigation} />
                    <View style={styles.container}>
                        <View style={styles.seperator} />
                    </View>
                </>
                )}
                ListEmptyComponent={<Text>No Playlists Created</Text>}

            />
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        // backgroundColor: "#ccc",
        alignItems: "center",
        justifyContent: "center",
    },
    header: {
        backgroundColor: "pink",
        height: 40,
        paddingHorizontal: 5,
    },
    text: {
        color: "black",
        fontWeight: "bold",
    },
    subtext: {
        color: "black",
    },
    seperator: {
        height: 1,
        backgroundColor: "black",
        marginVertical: 1,
        width: 300,
        marginBottom: 15,
        marginTop: 5,
    },

});