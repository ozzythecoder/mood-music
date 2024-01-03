import React from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from "react-native";
import { SongType } from "./SongFlatList";

const NewPlaylist = () => {
  const newPlaylist = useSelector((store: NewPlaylistType) => store.newPlaylist);

  console.log('new playlist on screen', newPlaylist)

  type NewPlaylistType = {
    newPlaylist: SongType[];
  };

  const Song = ({ song }: { song: SongType }) => {
    console.log('song in playlist: ', song)
    return (
      <View style={styles.entry}>
      <View style={styles.songInfo}>
        {song.image.length > 0 ? (
          <Image
            style={styles.albumThumbnail}
            source={{ uri: song.image }}
          />
        ) : (
          <View style={styles.placeholderImage} />
        )}
        <View>
          <Text style={styles.trackName}>{song.title}</Text>
          <Text style={styles.artistName}>{song.artists}</Text>
          <Text style={styles.albumName}>{song.album}</Text>
        </View>
      </View>
      </View >
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
    marginTop: 10,
  },
  list: {
    width: "90%",
  },
  entry: {
    marginBottom: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  songInfo: {
    flexDirection: "row",
    maxWidth: "60%",
  },
  moodView: {
    paddingTop: 5,
    maxWidth: "30%",
  },
  albumThumbnail: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 10,
  },
  trackInfo: {
    flex: 1,
  },
  trackName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 4,
  },
  artistName: {
    fontSize: 12,
    color: "#555",
  },
  albumName: {
    fontSize: 10,
    color: "#777",
  },
  placeholderImage: {
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: "#ddd",
  },
});
