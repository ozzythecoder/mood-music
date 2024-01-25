import React, { Dispatch, SetStateAction  } from "react";
import { StyleSheet, TextInput, View } from "react-native";

//TODO: Consider refactoring this to use React Context rather than prop drilling like this
type PlaylistTitleType = {
    playlistTitle: string;
  setPlaylistTitle: Dispatch<SetStateAction<string>>;
  playlistDescription: string;
  setPlaylistDescription: Dispatch<SetStateAction<string>>;
}

const PlaylistForm = ({
    playlistTitle,
    setPlaylistTitle,
    playlistDescription,
    setPlaylistDescription,
}: PlaylistTitleType) => {

  return (
    <View style={styles.container}>
      <View style={styles.input}>
      {/* Title input field */}
      <TextInput
        style={styles.inputText}
        placeholder="Title your new playlist"
        value={playlistTitle}
        clearButtonMode="always"
        onChangeText={(text) => setPlaylistTitle(text)}
      />
      </View>
      <View style={styles.input}>
      {/* Description input field */}
      <TextInput
        style={styles.inputText}
        placeholder="Add a description for your playlist"
        value={playlistDescription}
        clearButtonMode="always"
        onChangeText={(text) => setPlaylistDescription(text)}
      />
      </View>
    </View>
  );
};

export default PlaylistForm;

// styles
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: "center"
  },
  input: {
    padding: 10,
    marginTop: 10,
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