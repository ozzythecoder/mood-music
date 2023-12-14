import React from "react";
import { SafeAreaView, StyleSheet, View} from "react-native";
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
});
