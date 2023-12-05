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
  { artist: "Perfume Genius", title: "Whole Life" },
  { artist: "Perfume Genius", title: "Describe" },
  { artist: "Perfume Genius", title: "Without You" },
  { artist: "Perfume Genius", title: "Jason" },
  { artist: "Lucinda Williams", title: "Lonely Girls" },
  { artist: "Lucinda Williams", title: "Steal Your Love" },
  { artist: "Lucinda Williams", title: "I Envy the Wind" },
  { artist: "Lucinda Williams", title: "Blue" },
];



export default function Songs({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Text>Your Songs</Text>
      <FlatList
        data={SONGS}
        keyExtractor={(item) => item.title}
        renderItem={(data) => (
            <Song song={data.item} title={data.item.title} artist={data.item.artist} navigation={navigation}/>
        )}
        ListEmptyComponent={<Text>No Current Songs</Text>}

        // refreshing={true}
        // onRefresh={() => {}}
      />
    </SafeAreaView>
  );
}
