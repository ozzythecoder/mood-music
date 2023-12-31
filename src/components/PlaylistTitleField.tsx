import React, { Dispatch, SetStateAction  } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";


type PlaylistTitleType = {
    playlistTitle: string;
  setPlaylistTitle: Dispatch<SetStateAction<string>>;
}

const PlaylistTitle = ({
    playlistTitle,
    setPlaylistTitle,
}: PlaylistTitleType) => {

  return (
    <View style={styles.container}>
      <View style={styles.input}>
      {/* Title input field */}
      <TextInput
        style={styles.inputText}
        placeholder="Title Your New Playlist"
        value={playlistTitle}
        clearButtonMode="always"
        onChangeText={(text) => setPlaylistTitle(text)}
      />
      </View>
    </View>
  );
};

export default PlaylistTitle;

// styles
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: "center"
  },
  input: {
    padding: 10,
    width: "95%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 7,
  },
  inputText: {
    width: "90%",
    marginLeft: 5,
    fontSize: 20, 
  },
});