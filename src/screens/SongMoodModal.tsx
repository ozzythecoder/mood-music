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
  { moodName: "Happy", color: "yellow" },
  { moodName: "Sad", color: "blue" },
  { moodName: "Melancholic", color: "purple" },
  { moodName: "Excited", color: "green" },
  { moodName: "Adventurous", color: "orange" },
  { moodName: "Angry", color: "red" },
  { moodName: "Relaxed", color: "indigo" },
  { moodName: "Romantic", color: "pink" },
  { moodName: "Nostalgic", color: "tan" },
];

const SongMoodModal = () => {

  const [selectedMoods, setSelectedMoods] = useState<Array<{ moodName: string; color: string }>>([]);

  const getMoodColor = (moodName: string) => {
    const mood = selectedMoods.find(mood => mood.moodName === moodName);
    return mood ? { color: mood.color } : {};
}

  const handleValueChange = (value: boolean, mood: {moodName: string, color: string}) => {
    if (value === true) {
      setSelectedMoods((moods) => [...moods, mood]);
    } else {
      setSelectedMoods((moods) =>
        moods.filter((selectedMood) => mood.moodName !== selectedMood.moodName)
      );
    }
  };

  return (
    <View>
      <FlatList
        data={MOODS}
        keyExtractor={(item) => item.moodName}
        renderItem={({ item }) => {
          return (
            <View style={styles.mood}>
              <Text style={getMoodColor(item.moodName)}>{item.moodName}</Text>
              <Switch
                value={!!selectedMoods.find(mood => mood.moodName === item.moodName)}
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
