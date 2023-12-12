import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View,
} from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';


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

 type SongProps = {
   song: {
    artist: string;
    title: string;
  }
    navigation: SongScreenNavigationProp;
};



const Song = (props: SongProps) => {

  const dispatch = useDispatch();

  const handleClickSong = () => {
    dispatch({
      type: 'SET_CLICKED_SONG',
      payload: props.song,
  })
    props.navigation.navigate("SongMoodModal")
  }

  return (
    <View style={styles.song}>
      <View >
        <Text style={styles.text}>{props.song.title}</Text>
        <Text style={styles.subtext}>{props.song.artist}</Text>
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
