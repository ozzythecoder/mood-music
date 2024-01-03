import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, FlatList, Switch, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PlaylistType } from "../components/PlaylistsFlatList";

type StoreType = {
    selectedPlaylist: PlaylistType;
};



const SelectedPlaylistModal = ({ navigation }: { navigation: any }) => {
    const dispatch = useDispatch();

    const selectedPlaylist = useSelector((store: StoreType) => store.selectedPlaylist);


    useEffect(() => {
        selectedPlaylist.title ?
            navigation.setOptions({ title: selectedPlaylist.title })
            :
            navigation.setOptions({ title: selectedPlaylist.name })
            ;
    }, []);



    return (
        <View>

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
});
