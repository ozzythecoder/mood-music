import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from "react-native";

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontWeight: "bold",
  },
  subtext: {
    color: "black",
  },
  song: {
    marginBottom: 5,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

// type SongProps = {
//   artist: string;
//   song: string;
// };



const Song = (props) => {

  const dispatch = useDispatch();

  const handleClickSong = () => {
    dispatch({
      type: 'ADD_CLIP_TO_PHRASE',
      payload: { clip }
  })
      props.navigation.navigate("SongMoodModal");
  }

  return (
    <View style={styles.song}>
      <View >
        <Text style={styles.text}>{props.song}</Text>
        <Text style={styles.subtext}>{props.artist}</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => handleClickSong()}
        >
          <Text>Add Moods</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Song;
