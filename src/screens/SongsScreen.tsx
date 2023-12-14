import React from "react";
import { SafeAreaView, StyleSheet} from "react-native";
import { useState } from "react";
import SongList from "../components/SongFlatList";
import SongSearch from "../components/SongSearchBar";

export default function Songs({ navigation }: {navigation: any}) {
  const [librarySearch, setLibrarySearch] = useState("");

  return (
    <SafeAreaView style={styles.safeArea}>
      <SongSearch
        librarySearch={librarySearch}
        setLibrarySearch={setLibrarySearch}
      />
      <SongList navigation={navigation} librarySearch={librarySearch} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    backgroundColor: "pink",
    height: 40,
    paddingHorizontal: 5,
  },
  text: {
    color: "black",
    fontWeight: "bold",
  },
  subtext: {
    color: "black",
  },
  song: {
    marginBottom: 5,
    padding: 3,
  },
});
