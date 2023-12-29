import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector, useDispatch } from 'react-redux';

// Defining type for component state and API response
interface Artist {
  id: string;
  name: string;
}

interface Song {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { name: string };
}

function SpotifySearch() {

  const [artistSearchInput, setArtistSearchInput] = useState<string>('');
  const [songSearchInput, setSongSearchInput] = useState<string>('');
  const [artistSearchResults, setArtistSearchResults] = useState<Artist[]>([]);
  const [songSearchResults, setSongSearchResults] = useState<Song[]>([]);
  const [tab, setTab] = useState<'artist' | 'song'>('artist');

  // using useSelector to get the accessToken from the Redux store
  const accessToken = useSelector((store: any) => store.spotify.accessToken);
  const dispatch = useDispatch();

  const handleTabChange = (selectedTab: 'artist' | 'song') => {
    setTab(selectedTab);
  };

  // Search for songs based on artist name or song name
  const handleSearch = async () => {
    if (tab === 'artist') {
      // perform artist search here
      const handleArtistSearch = async () => {
        console.log('Searching for artists:', artistSearchInput);
    
        const artistParameters = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        };
    
        try {
          const response = await fetch(
            `https://api.spotify.com/v1/search?q=${artistSearchInput}&type=artist&limit=10`,
            artistParameters
          );
    
          const data: { artists: { items: Artist[] } } = await response.json();
          setArtistSearchResults(data.artists.items);
        } catch (error) {
          console.log('Error fetching artist search results:', error);
        }
    
        setArtistSearchInput('');
      };
    } else {
      // perform song search here
      const handleSongSearch = async () => {
        console.log('Searching for songs:', songSearchInput);
    
        const songParameters = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        };
    
        try {
          const response = await fetch(
            `https://api.spotify.com/v1/search?q=${songSearchInput}&type=track&limit=10`,
            songParameters
          );
    
          const data: { tracks?: { items?: Song[] } } = await response.json();
          if (data.tracks && data.tracks.items) {
            setSongSearchResults(data.tracks.items);
          } else {
            // Handle the case when items are missing
            console.log('No song results found');
          }
    
        } catch (error) {
          console.log('Error fetching song search results:', error);
        }
    
        setSongSearchInput('');
      };
    }
  }

  return (
    <View style={styles.container}>
      {/* Tab Buttons */}
     {/* Search Text and Tab Buttons */}
     <View style={styles.searchTextContainer}>
        <Text style={styles.searchText}>Search by </Text>
        <TouchableOpacity
          style={[styles.tabButton, tab === 'artist' ? styles.activeTab : null]}
          onPress={() => handleTabChange('artist')}
        >
          <Text style={styles.tabButtonText}>Artist</Text>
        </TouchableOpacity>
        <Text style={styles.searchText}> or </Text>
        <TouchableOpacity
          style={[styles.tabButton, tab === 'song' ? styles.activeTab : null]}
          onPress={() => handleTabChange('song')}
        >
          <Text style={styles.tabButtonText}>Song</Text>
        </TouchableOpacity>
        <Text style={styles.searchText}> Name</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder={`Search for ${tab === 'artist' ? 'artist' : 'song'}`}
          placeholderTextColor="#777"
          value={tab === 'artist' ? artistSearchInput : songSearchInput}
          onChangeText={(text) => (tab === 'artist' ? setArtistSearchInput(text) : setSongSearchInput(text))}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search Results */}
      {tab === 'artist' ? (
        artistSearchResults.length > 0 ? (
          <FlatList
            data={artistSearchResults}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <Text>{item.name}</Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.resultsText}>No artist results found</Text>
        )
      ) : (
        songSearchResults.length > 0 ? (
          <FlatList
            data={songSearchResults.slice(0, 10)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.resultItem}>
                <Text style={styles.songName}>{item.name}</Text>
                <Text style={styles.artistName}>{item.artists.map(artist => artist.name).join(', ')}</Text>
                <Text style={styles.albumName}>{item.album.name}</Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.resultsText}>No song results found</Text>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  searchTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchText: {
    fontSize: 16,
  },
  tabButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#ddd',
  },
  activeTab: {
    backgroundColor: 'tomato',
  },
  tabButtonText: {
    color: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 12,
    color: '#333',
    backgroundColor: '#fff',
  },
  searchButton: {
    backgroundColor: 'tomato',
    padding: 10,
    borderRadius: 8,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultItem: {
    marginBottom: 16,
  },
  songName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  artistName: {
    fontSize: 16,
    color: '#555',
  },
  albumName: {
    fontSize: 14,
    color: '#777',
  },
  resultsText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#333',
  },
});

export default SpotifySearch;