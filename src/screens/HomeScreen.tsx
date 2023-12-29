import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import SpotifySearch from "../components/Spotify/SpotifySearch";
import SpotifyAccessToken from "../components/Spotify/SpotifyAccessToken";
import MoodButtons from "../components/MoodButtons";

const HomeScreen = ({ navigation }: {navigation: any}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "GET_DB_SONGS" });
  }, []);

  useFocusEffect(() => {
    dispatch({ type: "GET_MOODS" });
  });

    useEffect(() => {
        dispatch({ type: "GET_ACCESS_TOKEN" })
    }, []);

  return (
    <>
      <MoodButtons navigation={navigation} />
            <SpotifyAccessToken />
      <SpotifySearch />
    </>
  );
};

export default HomeScreen;
