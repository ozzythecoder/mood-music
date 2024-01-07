import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

interface Artist {
    id: string;
    name: string;
    images?: { height: number; url: string; width: number }[];
    followers?: { href: null; total: number };
    genres?: string[];
}

interface Album {
    name: string;
    releaseDate: number;
    coverArt: string;
}

interface Song {
    name: string;
}

const SearchArtistSongsScreen = () => {
    const dispatch = useDispatch();
    const searchedArtistId = useSelector((store: any) => store.spotify.searchedArtistId);
    const accessToken = useSelector((store: any) => store.spotify.accessToken.accessToken);
    const artistInfo = useSelector((store: any) => store.spotify.artistInfo);
    const topTracks = useSelector((store: any) => store.spotify.artistTopTracks.tracks);

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

                const data = await response.json();

                dispatch({
                    type: 'SET_ARTIST_TOP_TRACKS',
                    payload: {
                        tracks: data.tracks.map((track: any) => ({
                            name: track.name,
                            album: {
                                name: track.album.name,
                                releaseDate: track.album.release_date,
                                coverArt: track.album.images[0].url,
                            },
                        })),
                    },
                });
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
            {topTracks && (
                <FlatList
                    data={topTracks}
                    keyExtractor={(item: { name: string; album: Album }) => item.name}
                    renderItem={({ item }) => (
                        <View>
                            <Text>{item.name}</Text>
                            <Text>Album: {item.album.name}</Text>
                            <Text>Release Date: {item.album.releaseDate}</Text>
                            <Image source={{ uri: item.album.coverArt }} style={{ width: 50, height: 50 }} />
                        </View>
                    )}
                />
            )}
        </View>
    );
};

export default SearchArtistSongsScreen;
