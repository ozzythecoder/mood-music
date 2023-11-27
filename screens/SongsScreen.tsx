import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, FlatList, SectionList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: 'pink',
    height: 40,
    paddingHorizontal: 5,
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
  },
  song: {
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'grey',
    marginBottom: 10,
    height: 50
  },
});

const SONGS = [
  { artist: 'Perfume Genius', data: ['Whole Life', 'Describe', 'Without You', 'Jason']},
  { artist: 'Lucinda Williams', data: ['Lonely Girls', 'Steal Your Love', 'I Envy the Wind', 'Blue']},
];

const Song = props => {
  return (
    <View style={styles.song}>
      <Text style={styles.text}>{props.name}</Text>
    </View>
  );
}

export default function Songs() {
    return (
        <SafeAreaView style={styles.safeArea}>
          <SectionList
          sections = {SONGS}
          keyExtractor={item => item}
          renderItem={data => <Song name={data.item} />}
          renderSectionHeader={({ section }) => (
            <Text style={styles.header}>{section.artist}</Text>
          )}
          />
        </SafeAreaView >
    );
  }
  
