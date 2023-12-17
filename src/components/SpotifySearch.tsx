import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';

function SpotifySearch() {
  const [searchInput, setSearchInput] = useState('');
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    // API Access Token
    fetchSpotifyAccessToken();
  }, []);

  const fetchSpotifyAccessToken = () => {
    // Assuming your server endpoint is accessible via a public URL
    axios
      .post('http://localhost:5000/api/spotify')
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
      const data = await response.json();
      console.log(data);
      // Continue with the logic to handle the search results
    } catch (error) {
      console.log('Error fetching search results:', error);
    }

    setSearchInput('');
  };

  return (
    <View>
      <TextInput
        placeholder="Search Artist"
        value={searchInput}
        onChangeText={(text) => setSearchInput(text)}
      />
      <Button title="Search" onPress={handleSearch} />
      <Text>Search results to show here:</Text>
      {/* Continue with the logic to display search results */}
    </View>
  );
}

export default SpotifySearch;