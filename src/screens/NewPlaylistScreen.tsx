import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { SafeAreaView, StyleSheet} from "react-native";
import { useState } from "react";

export default function NewPlaylist({ navigation }: {navigation: any}) {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.safeArea}>
{/* playback control buttons eventually? */}

{/* flatlist with the playlist 
    includes re-regenerate switch*/}

{/* re-generate button */}
{/* title your playlist field  */}
{/* save button */}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
    },
  });
  