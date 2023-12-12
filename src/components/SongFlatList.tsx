import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View,
  FlatList
} from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';


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



const SongList = ({navigation}) => {

  const dispatch = useDispatch();

 const songsDB = useSelector((store: StoreType) => store.songs)

  useEffect(() => {
    dispatch({ type: 'GET_DB_SONGS' })
    
  }, []);

  type StoreType = {
    songs: {
      id: number;
      title: string;
      artist: string;
    }[]
  }

  type SongType = {
    id: number;
    artist: string;
    title: string;
  }

  const handleClickSong = (song: SongType) => {
    dispatch({
      type: 'SET_CLICKED_SONG',
      payload: song,
  })
    navigation.navigate("SongMoodModal")
  }

  return (
    <FlatList
    data={songsDB}
    keyExtractor={(item) => item.title}
    renderItem={(data) => (
      <View style={styles.song}>
      <View >
        <Text style={styles.text}>{data.item.title}</Text>
        <Text style={styles.subtext}>{data.item.artist}</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => handleClickSong(data.item)}
        >
          <Text>Add Moods</Text>
        </TouchableOpacity>
      </View>
    </View>
    )}
    ListEmptyComponent={<Text>No Current Songs</Text>}

    // refreshing={true}
    // onRefresh={() => {}}
  />


  );
};

export default SongList;
