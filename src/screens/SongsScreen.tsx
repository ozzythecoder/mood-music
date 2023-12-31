import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { SafeAreaView, StyleSheet} from "react-native";
import { useState } from "react";
import SongList from "../components/SongFlatList";
import SongSearch from "../components/SongSearchField";

export default function Songs({ navigation }: {navigation: any}) {
  const dispatch = useDispatch();

  useFocusEffect(() => {
    dispatch({ type: "GET_DB_SONGS" });
  });

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
