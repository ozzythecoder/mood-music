import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from "react-native";
import SongMoodList from "./SongMoodFlatList";

type SongArrayType = {
  songs: SongType[];
};

export type SongType = {
  _id: string;
  title: string;
  artists: string;
  album: string;
  image: string;
  moods: string[];
  moodFull: { _id: string; moodName: string; color: string }[];
};

const SongList = ({
  navigation,
  librarySearch,
}: {
  navigation: any;
  librarySearch: string;
}) => {
  const dispatch = useDispatch();

  const songsDB = useSelector((store: SongArrayType) => store.songs);

  const handleClickSong = (song: SongType) => {
    dispatch({
      type: "SET_CLICKED_SONG",
      payload: song,
    });
    navigation.navigate("SongMoodModal");
  };

  const Song = ({ song }: { song: SongType }) => {
    return (
      <TouchableOpacity onPress={() => handleClickSong(song)}>
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

          <View style={styles.moodView}>
            <SongMoodList song={song} />
            <Text>Add Moods</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSong = ({ item }: { item: SongType }) => {
    if (librarySearch === "") {
      return <Song song={item} />;
    }
    if (
      item.title
        .toUpperCase()
        .includes(librarySearch.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Song song={item} />;
    }
    if (
      item.artists
        .toUpperCase()
        .includes(librarySearch.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Song song={item} />;
    }
      if (
        item.moods && 
        item.moods.some(mood => 
          mood.toUpperCase().includes(librarySearch.toUpperCase().trim().replace(/\s/g, ""))
        )
        ) 
      {
      return <Song song={item} />
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={songsDB}
        keyExtractor={(item) => item._id}
        renderItem={(data) => renderSong(data)}
        ListEmptyComponent={<Text>No Current Songs</Text>}
      />
    </View>
  );
};

export default SongList;

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
