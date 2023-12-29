import React from "react";
import { useSelector } from "react-redux";
import { SafeAreaView, StyleSheet} from "react-native";
import NewPlaylist from "../components/NewPlaylistFlatList";
import CreatePlaylistButton from "../components/CreatePlaylistButton";

type ClickedMoodType = { 
  clickedMood: {
  _id: string; 
  moodName: string; 
  color: string
  } 
}

export default function NewPlaylistScreen({ navigation }: {navigation: any}) {
  const clickedMood = useSelector((store: ClickedMoodType) => store.clickedMood);

  return (
    <SafeAreaView style={styles.safeArea}>
{/* playback control buttons eventually? */}

{/* flatlist with the playlist 
    needs re-regenerate switch*/}
<NewPlaylist />
{/* re-generate button */}
<CreatePlaylistButton clickedMood = {clickedMood} />
{/* title your playlist field  */}
{/* save button */}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
    },
  });
  