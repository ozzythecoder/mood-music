import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

type SongType = {
  _id: string;
  artist: string;
  title: string;
  moods: [{ moodName: string;}];
  moodFull: [{ moodName: string; color: string;}];
};

const SongMoodList = ({ song }: { song: SongType }) => {
  return (
      <FlatList
        horizontal={true}
        style={{marginLeft: 15}}
        data={song.moodFull}
        keyExtractor={(item) => item.moodName}
        renderItem={(data) => (
          <View
            style={[styles.moodBox, { backgroundColor: data.item.color }]}
          />
        )}
      />
  );
};

export default SongMoodList;

const styles = StyleSheet.create({
  moodBox: {
    height: 17,
    width: 17,
    margin: 2,
    borderRadius: 5,
  },
});
