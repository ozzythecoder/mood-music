import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, TouchableOpacity, FlatList } from "react-native";

const numColumns = 3;
const margin = 2;
// this will definitely need to be updated to a more universal way of styling the buttons for different screen widths

const MoodButtons = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const moodsDB = useSelector((store: MoodsArrayType) => store.moods);

  type MoodType = {
    _id: string;
    moodName: string;
    color: string;
  };

  type MoodsArrayType = {
    moods: MoodType[];
  };

  const handleClickMood = (mood: MoodType) => {
    dispatch({
      type: "SET_CLICKED_MOOD",
      payload: mood,
    });
    navigation.navigate("NewPlaylistScreen");
  };

  return (
    <FlatList
      data={moodsDB}
      keyExtractor={(item) => item.moodName}
      numColumns={numColumns}
      renderItem={({ item }) => {
        const textColor =
          parseInt(item.color.replace("#", ""), 16) > 0xffffff / 1.1
            ? "black"
            : "white";

        return (
          <TouchableOpacity
            style={[
              styles.button,
              {
                width: `${(100 - margin * (numColumns + 1)) / numColumns}%`,
                backgroundColor: item.color,
              },
            ]}
            onPress={() => handleClickMood(item)}
          >
            <Text style={[styles.buttonText, { color: textColor }]}>
              {item.moodName}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default MoodButtons;

const styles = StyleSheet.create({
  button: {
    margin: 5,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
