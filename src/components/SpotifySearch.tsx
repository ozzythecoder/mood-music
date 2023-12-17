import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from "@expo/vector-icons/Ionicons";

function SpotifySearch() {
    const [searchInput, setSearchInput] = useState('');
    const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
        // API Access Token
        fetchSpotifyAccessToken();
    }, []);

    const fetchSpotifyAccessToken = () => {
        // requesting access token from spotify
        axios
            .post('http://localhost:3000/api/spotify')
            .then((response) => {
                console.log('access token is:', response.data.access_token);
                // setting access token to local state
                setAccessToken(response.data.access_token);
            })
            .catch((error) => {
                console.log('error with access token fetch POST', error);
            });
    };

    // Search
    const handleSearch = async () => {
        console.log('Searching for:', searchInput);
        // get request using search to get the Artist ID

        // parameters to send along with search request below
        const artistParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken,
            },
        };

        try {
            const response = await fetch(
                `https://api.spotify.com/v1/search?q=${searchInput}&type=artist`,
                artistParameters
            );

            console.log('Full search response:', response);

            const data = await response.json();
            console.log("search results:", data);
            // Continue with the logic to handle the search results
        } catch (error) {
            console.log('Error fetching search results:', error);
        }

        setSearchInput('');
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Search for an artist"
                    value={searchInput}
                    onChangeText={(text) => setSearchInput(text)}
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Ionicons name="search" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
            <Text>Search results to show here:</Text>
            {/* Continue with the logic to display search results */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      padding: 16,
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
      backgroundColor: '#fff'
    },
    searchButton: {
      backgroundColor: 'tomato',
      padding: 10,
      borderRadius: 8,
      marginLeft: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    resultsText: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 16,
      color: '#333',
    },
  });

export default SpotifySearch;