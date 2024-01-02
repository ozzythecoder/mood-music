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


type PlaylistProps = {
  blurb: string;
  title: string;
  navigation: PlaylistsScreenNavigationProp;
};

const Playlist = (props: PlaylistProps) => {

  const dispatch = useDispatch();

  const handleClickPlaylist = () => {

  }

  return (
    <View style={styles.playlist}>
      <View >
        <Text style={styles.text}>{props.title}</Text>
        <Text style={styles.subtext}>{props.blurb}</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => handleClickPlaylist()}
        >
          <Text>Go To ➡️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  text: {
    color: "black",
    fontWeight: "bold",
  },
  subtext: {
    color: "black",
  },
  playlist: {
    marginBottom: 5,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});



export default Playlist;