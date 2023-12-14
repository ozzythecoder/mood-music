import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Feather} from "@expo/vector-icons";


const SongSearch = ({
  librarySearch,
  setLibrarySearch,
}: {
  librarySearch: string;
}) => {

  return (
    <View style={styles.container}>
              <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
      {/* search input field */}
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={librarySearch}
        clearButtonMode="always"
        onChangeText={(text) => setLibrarySearch(text)}
      />
    </View>
  );
};

export default SongSearch;

// styles
const styles = StyleSheet.create({
  container: {
    margin: 15,
    paddingLeft: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 7,
  },
  input: {
    fontSize: 20,
    padding: 10,
    width: "90%",
  },
});
