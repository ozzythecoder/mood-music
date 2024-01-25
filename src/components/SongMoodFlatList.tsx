import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import type { Song } from "@src/definitions";

const SongMoodList = ({ song }: { song: Song }) => {
    return (
        <View style={styles.moods}>
            <FlatList
                horizontal={true}
                data={song.moodFull}
                keyExtractor={(item) => item.moodName}
                renderItem={(data) => (
                    <View
                        style={[styles.moodBox, { backgroundColor: data.item.color }]}
                    />
                )}
            />
        </View>
    );
};

export default SongMoodList;

const styles = StyleSheet.create({
    moods: {
        marginBottom: 2,
    },
    moodBox: {
        height: 10,
        width: 10,
        margin: 1,
        borderRadius: 5,
    },
});
