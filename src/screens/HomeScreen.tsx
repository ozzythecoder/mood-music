import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import SpotifySearch from "../components/SpotifySearch";
import MoodButtons from "../components/MoodButtons";

const HomeScreen = ({ navigation }: {navigation: any}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "GET_DB_SONGS" });
  }, []);

  useEffect(() => {
    dispatch({ type: "GET_MOODS" });
  }, []);

  return (
    <>
      <MoodButtons navigation={navigation} />
      <SpotifySearch />
    </>
  );
};

export default HomeScreen;
