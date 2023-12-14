import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";

const SongList = ({ navigation, librarySearch }: {navigation: any, librarySearch: string}) => {
  const dispatch = useDispatch();

  const songsDB = useSelector((store: SongArrayType) => store.songs);

  useEffect(() => {
    dispatch({ type: "GET_DB_SONGS" });
  }, []);

  type SongArrayType = {
    songs: SongType[];
  };

  type SongType = {
    id: number;
    artist: string;
    title: string;
  };

  const handleClickSong = (song: SongType) => {
    dispatch({
      type: "SET_CLICKED_SONG",
      payload: song,
    });
    navigation.navigate("SongMoodModal");
  };

  const Song = ({song}: {song: SongType}) => {
    return(
    <View style={styles.song}>
    <View>
      <Text style={styles.text}>{song.title}</Text>
      <Text style={styles.subtext}>{song.artist}</Text>
    </View>
    <View>
      <TouchableOpacity onPress={() => handleClickSong(song)}>
        <Text>Add Moods</Text>
      </TouchableOpacity>
    </View>
  </View>
    )
  }

  const renderSong = ({item}: {item: SongType}) => {
    if (librarySearch === "") {
      return <Song song={item} />
    }
    if (item.title.toUpperCase().includes(librarySearch.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Song song={item} />
    }
    if (item.artist.toUpperCase().includes(librarySearch.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Song song={item} />
    } 
  }

  return (
    <View   style={styles.container}>
      <FlatList
      style={styles.list}
        data={songsDB}
        keyExtractor={(item) => item.title}
        renderItem={(data) => renderSong(data)}
        ListEmptyComponent={<Text>No Current Songs</Text>}

        // refreshing={true}
        // onRefresh={() => {}}
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
    width: "90%"
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
    flexDirection: "row",
  },
});
