import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

interface Artist {
    id: string;
    name: string;
    images?: { height: number; url: string; width: number }[];
    followers?: { href: null; total: number };
    genres?: string[];
}

interface Track {
    id: string;
    name: string;
    artists: { name: string }[];
    album: {
        name: string;
        images: { url: string }[];
    };
}

const SearchArtistSongsScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const searchedArtistId = useSelector((store: any) => store.spotify.searchedArtistId);
    const accessToken = useSelector((store: any) => store.spotify.accessToken.accessToken);
    const artistInfo = useSelector((store: any) => store.spotify.artistInfo);

    const [topTrackResults, setTopTracksResults] = useState<Track[]>([]);

    // send Track to clickedSong reducer and go to SongMoodModal
    const handleTrackClick = (track: Track) => {

        // console.log("track is:", track)
        dispatch({
            type: "SET_CLICKED_SONG",
            payload: track,
        });
        navigation.navigate("SongMoodModal");
    };

    useEffect(() => {
        const fetchArtistInfo = async () => {
            // console.log('inside fetchArtistInfo with artist ID:', searchedArtistId)
            try {
                const response = await fetch(`https://api.spotify.com/v1/artists/${searchedArtistId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + accessToken,
                    },
                });

                const data: Artist = await response.json();

                dispatch({
                    type: 'SET_ARTIST_INFO',
                    payload: data,
                });
            } catch (error) {
                console.error('Error fetching artist info:', error);
            }
        };

        const fetchArtistTopTracks = async () => {
            try {
                const response = await fetch(`https://api.spotify.com/v1/artists/${searchedArtistId}/top-tracks?market=US`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + accessToken,
                    },
                });

                const data: { tracks?: Track[] } = await response.json();
                if (data.tracks) {
                    setTopTracksResults(data.tracks);
                } else {
                    console.log('No track results found');
                }
            } catch (error) {
                console.error('Error fetching artist songs:', error);
            }
        };

        // Fetch artist information when the component mounts
        fetchArtistInfo();
        // Fetch artist songs if needed
        fetchArtistTopTracks();
    }, [searchedArtistId, accessToken, dispatch]);

    return (
        <View>
            {artistInfo && (
                <View>
                    <Text>{artistInfo.name}</Text>
                    {artistInfo.genres && <Text>Genres: {artistInfo.genres.join(', ')}</Text>}
                    {artistInfo.followers && <Text>Followers: {artistInfo.followers.total}</Text>}
                    {artistInfo.images && (
                        <Image
                            source={{ uri: artistInfo.images[0].url }}
                            style={{ width: 100, height: 100 }}
                        />
                    )}
                </View>
            )}
            <Text>Artist Songs</Text>
            {topTrackResults.length > 0 ? (
                <FlatList
                    data={topTrackResults}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleTrackClick(item)}>
                            <View>
                                <Text>{item.name}</Text>
                                <Text>Album: {item.album.name}</Text>
                                <Text>Release Date: {item.album.release_date}</Text>
                                {item.album.images.length > 0 && (
                                    <Image source={{ uri: item.album.images[0].url }} style={{ width: 50, height: 50 }} />
                                )}
                            </View>
                        </TouchableOpacity>
                    )}
                />
            ) : (
                <Text>No top tracks</Text>
            )}
        </View>
    );
};

export default SearchArtistSongsScreen;
