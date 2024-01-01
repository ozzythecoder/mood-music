import React from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import SongMoodList from "./SongMoodFlatList";

const NewPlaylist = () => {
  const newPlaylist = useSelector((store: NewPlaylistType) => store.newPlaylist);

  console.log('new playlist on screen', newPlaylist)

  type NewPlaylistType = {
    newPlaylist: SongType[];
  };

  type SongType = {
    _id: string;
    artist: string;
    title: string;
    moods: [string];
    moodFull: [{ _id: string; moodName: string; color: string }];
  };

  const Song = ({ song }: { song: SongType }) => {
    console.log('song in playlist: ', song)
    return (
        <View style={styles.song}>
          <View>
            <Text style={styles.text}>{song.title}</Text>
            <Text style={styles.subtext}>{song.artist}</Text>
          </View>
          <SongMoodList song={song} />
        </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={newPlaylist}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => <Song song={item} />}
        ListEmptyComponent={<Text>No Current Songs</Text>}
      />
    </View>
  );
};

export default NewPlaylist;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  list: {
    width: "90%",
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
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});
