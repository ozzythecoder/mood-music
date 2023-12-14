import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";

const SongSearch = ({
  librarySearch,
  setLibrarySearch,
}: {
  librarySearch: string;
}) => {

  return (
    <View style={styles.container}>
      <View style={styles.input}>
      <Feather
        name="search"
        size={20}
        color="black"
      />
      {/* search input field */}
      <TextInput
        style={styles.inputText}
        placeholder="Search"
        value={librarySearch}
        clearButtonMode="always"
        onChangeText={(text) => setLibrarySearch(text)}
      />
      </View>
    </View>
  );
};

export default SongSearch;

// styles
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: "center"

  },
  input: {
    padding: 10,
    width: "90%",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 7,
  },
  inputText: {
    marginLeft: 5,
    fontSize: 20, 
  },
});
