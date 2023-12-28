import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import SpotifySearch from "../components/SpotifySearch";
import MoodButtons from "../components/MoodButtons";

const HomeScreen = ({ navigation }: {navigation: any}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "GET_DB_SONGS" });
  }, []);

  useFocusEffect(() => {
    dispatch({ type: "GET_MOODS" });
  });

  return (
    <>
      <MoodButtons navigation={navigation} />
      <SpotifySearch />
    </>
  );
};

export default HomeScreen;
