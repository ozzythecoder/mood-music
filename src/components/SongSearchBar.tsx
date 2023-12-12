import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  StyleSheet, 
  Text, 
TextInput,
  View,
} from "react-native";



const SongSearch = () => {

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

return (
  <View style={styles.container}>
    {/* search input field */}
   <TextInput
          style={styles.input}
          placeholder="Search"
          clearButtonMode="always"
        />
    </View>
  );
};

export default SongSearch;

// styles
const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",

  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
});