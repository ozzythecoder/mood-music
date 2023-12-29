import React from "react";
import usePlaylist from "../hooks/use-playlist";
import { StyleSheet, Text, TouchableOpacity} from "react-native";

type MoodType = {
  _id: string;
  moodName: string;
  color: string;
};

const CreatePlaylistButton = ({clickedMood}: {clickedMood: MoodType}) => {
  const newPlaylist = usePlaylist();

  return (
          <TouchableOpacity
            style={styles.button}
            onPress={() => newPlaylist(clickedMood)}
          >
            <Text style={[styles.buttonText]}>
              Regenerate Playlist
            </Text>
          </TouchableOpacity>
        );
};

export default CreatePlaylistButton;

const styles = StyleSheet.create({
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
