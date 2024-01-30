import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, FlatList, Switch, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import type { Song, Mood, MoodsArrayType } from "@src/definitions";

type StoreType = {
    clickedSong: Song;
};

const SongMoodModal = ({ navigation }: { navigation: any }) => {
    const dispatch = useDispatch();

    const clickedSong = useSelector((store: StoreType) => store.clickedSong);
    const moodsDB = useSelector((store: MoodsArrayType) => store.moods);

    const [selectedMoods, setSelectedMoods] = useState<Mood[]>([]);

    // TODO: What is going on here? vvv
    useEffect(() => {
        clickedSong.title
            ? navigation.setOptions({ title: clickedSong.title })
            : navigation.setOptions({ title: clickedSong.name })
        ;
    }, []);

    // sets the mood switches to the current song
    useEffect(() => {
        if (clickedSong.moodFull) {
            setSelectedMoods(clickedSong.moodFull);
        }
    }, []);

    const handleSaveMoods = (
        song: Song,
        selectedMoods: Mood[],
    ) => {
        const songWithMoods = { song: song, moods: selectedMoods };
        dispatch({
            type: "EDIT_SONG_MOODS",
            payload: songWithMoods,
        });
        navigation.navigate("Songs");
    };

    const handleValueChange = (
        value: boolean,
        mood: Mood,
    ) => {
        if (value === true) {
            setSelectedMoods((moods) => [...moods, mood]);
        } else {
            setSelectedMoods((moods) =>
                moods.filter((selectedMood) => mood.moodName !== selectedMood.moodName),
            );
        }
    };

    return (
        <View style={styles.safeArea}>
            <View>
                <FlatList
                    data={moodsDB}
                    keyExtractor={(item) => item.moodName}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.mood}>
                                <Text>{item.moodName}</Text>
                                <Switch
                                    trackColor={{ false: "grey", true: item.color }}
                                    value={
                                        !!selectedMoods.find(
                                            (mood) => mood.moodName === item.moodName,
                                        )
                                    }
                                    onValueChange={(selected) => {
                                        handleValueChange(selected, item);
                                    }}
                                />
                            </View>
                        );
                    }}
                />
            </View>
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleSaveMoods(clickedSong, selectedMoods)}
                >
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SongMoodModal;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingBottom: 50,
    },
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
