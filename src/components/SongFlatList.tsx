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

  const songsDB = useSelector((store: StoreType) => store.songs);

  useEffect(() => {
    dispatch({ type: "GET_DB_SONGS" });
  }, []);

  type StoreType = {
    songs: {
      id: number;
      title: string;
      artist: string;
    }[];
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

  const Song = ({song}) => {
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

  const renderSong = ({item}) => {
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
    <View>
      <FlatList
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
  text: {
    color: "black",
    fontWeight: "bold",
  },
  subtext: {
    color: "black",
  },
  song: {
    marginBottom: 5,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
