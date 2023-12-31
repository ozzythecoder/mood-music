import React from "react";
import { useDispatch } from "react-redux";
import { useSelector} from "react-redux/es/hooks/useSelector";
import { StyleSheet, Text, TouchableOpacity} from "react-native";

type MoodType = {
  _id: string;
  moodName: string;
  color: string;
};

const SavePlaylistButton = ({playlistTitle,  navigation} : {playlistTitle: string, navigation: any}) => {
    const newPlaylist = useSelector((store: NewPlaylistType) => store.newPlaylist);
    const dispatch = useDispatch();

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

      const handleSavePlaylist = (
        playlistTitle: string,
        newPlaylist: SongType[]
      ) => {
        const playlist = { playlistTitle, newPlaylist };
        dispatch({
          type: "SAVE_PLAYLIST",
          payload: playlist,
        });
        navigation.navigate("Songs");
      }

  return (
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSavePlaylist(playlistTitle, newPlaylist)}
          >
            <Text style={[styles.buttonText]}>
              Regenerate Playlist
            </Text>
          </TouchableOpacity>
        );
};

export default SavePlaylistButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 6,
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
