import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Song from "../components/Song";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    backgroundColor: "pink",
    height: 40,
    paddingHorizontal: 5,
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
    padding: 3,
  },

});

const SONGS = [
  { artist: "Perfume Genius", song: "Whole Life" },
  { artist: "Perfume Genius", song: "Describe" },
  { artist: "Perfume Genius", song: "Without You" },
  { artist: "Perfume Genius", song: "Jason" },
  { artist: "Lucinda Williams", song: "Lonely Girls" },
  { artist: "Lucinda Williams", song: "Steal Your Love" },
  { artist: "Lucinda Williams", song: "I Envy the Wind" },
  { artist: "Lucinda Williams", song: "Blue" },
];



export default function Songs({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text>Your Songs</Text>
      <FlatList
        data={SONGS}
        keyExtractor={(item) => item.song}
        renderItem={(data) => (
            <Song song={data.item.song} artist={data.item.artist} navigation={navigation}/>
        )}
        ListEmptyComponent={<Text>No Current Songs</Text>}

        // refreshing={true}
        // onRefresh={() => {}}
      />
    </SafeAreaView>
  );
}
