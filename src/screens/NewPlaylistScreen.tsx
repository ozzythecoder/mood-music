import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SafeAreaView, StyleSheet } from "react-native";
import NewPlaylist from "../components/NewPlaylistFlatList";
import CreatePlaylistButton from "../components/CreatePlaylistButton";
import PlaylistTitle from "../components/PlaylistTitleField";
import SavePlaylistButton from "../components/SavePlaylistButton";

type ClickedMoodType = {
  clickedMood: {
    _id: string;
    moodName: string;
    color: string;
  };
};

export default function NewPlaylistScreen({ navigation }: { navigation: any }) {
  const clickedMood = useSelector(
    (store: ClickedMoodType) => store.clickedMood
  );
  const [playlistTitle, setPlaylistTitle] = useState("");

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* playback control buttons eventually? */}

      {/* flatlist with the playlist 
    needs re-regenerate switch*/}
      <NewPlaylist />
      {/* re-generate button */}
      <CreatePlaylistButton clickedMood={clickedMood} />
      {/* title your playlist field  */}
      <PlaylistTitle
        playlistTitle={playlistTitle}
        setPlaylistTitle={setPlaylistTitle}
      />
      {/* save button */}
      <SavePlaylistButton playlistTitle={playlistTitle} navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
