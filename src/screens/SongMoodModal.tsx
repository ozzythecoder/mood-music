import React from "react";
import { useState } from "react";
import { View, Text, FlatList, Switch, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mood: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
});

const MOODS = [
  { mood: "Happy", color: "yellow" },
  { mood: "Sad", color: "blue" },
  { mood: "Melancholic", color: "purple" },
  { mood: "Excited", color: "green" },
  { mood: "Adventurous", color: "orange" },
  { mood: "Angry", color: "red" },
  { mood: "Relaxed", color: "indigo" },
  { mood: "Romantic", color: "pink" },
  { mood: "Nostalgic", color: "tan" },
];
const SongMoodModal = ({ song, title, artist }) => {
  const [selectedMoods, setSelectedMoods] = useState([]);

  const handleValueChange = (value, mood) => {
    if (value === true) {
      setSelectedMoods((moods) => [...moods, mood]);
    } else {
      setSelectedMoods((moods) =>
        moods.filter((selectedMood) => mood.mood !== selectedMood.mood)
      );
    }
  };

  return (
    <View>
      <FlatList
        data={MOODS}
        keyExtractor={(item) => item.mood}
        renderItem={({ item }) => {
          return (
            <View style={styles.mood}>
              <Text>{item.mood}</Text>
              <Switch
                value={selectedMoods.find(song)}
                onValueChange={selected => {handleValueChange(selected, item )}}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default SongMoodModal;
