import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
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

export interface Track {
    id: string;
    name: string;
    artists: { name: string }[];
    album: {
        name: string;
        images: { url: string }[];
        releaseDate?: number;
    };
}

const SearchArtistSongsScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
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
                console.log("current data is:", data)

                dispatch({
                    type: 'SET_ARTIST_TOP_TRACKS',
                    payload: {
                        tracks: data.tracks.map((track: any) => ({
                            id: track.id,
                            name: track.name,
                            artists: track.artists,
                            album: {
                                name: track.album.name,
                                images: [{ url: track.album.images[0].url }],
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

    const handleClickSong = (track: Track) => {
        dispatch({
            type: "SET_CLICKED_SONG",
            payload: track,
        });
        navigation.navigate("SongMoodModal");
    };

    return (
        <View>
            {artistInfo && (
                <View style={styles.artistHeader}>
                    <Text style={styles.artistName}>{artistInfo.name}</Text>
                    {artistInfo.genres && <Text style={styles.genres}>Genres: {artistInfo.genres.join(', ')}</Text>}
                    {artistInfo.followers && <Text style={styles.followers}>Followers: {artistInfo.followers.total}</Text>}
                    {artistInfo.images && (
                        <Image
                            source={{ uri: artistInfo.images[0]?.url }}
                            style={styles.artistImage}
                        />
                    )}
                </View>
            )}

            <Text style={styles.resultsText}>Top Tracks by {artistInfo.name}</Text>
            {topTracks && (
                <FlatList
                    data={topTracks}
                    keyExtractor={(item: Track) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleClickSong(item)}>
                            <View style={styles.trackResultItem}>
                                {item.album.images.length > 0 ? (
                                    <Image
                                        style={styles.albumThumbnail}
                                        source={{ uri: item.album.images[0].url }}
                                    />
                                ) : (
                                    <View style={styles.placeholderImage} />
                                )}
                                <View style={styles.trackInfo}>
                                    <Text style={styles.trackName}>{item.name}</Text>
                                    <Text style={styles.albumName}>{item.album.name}</Text>
                                    {/* Assuming releaseDate is part of album */}
                                    <Text style={styles.releaseDate}>{item.album.releaseDate}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    artistHeader: {
        alignItems: 'center',
        marginBottom: 16,
    },
    artistName: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    genres: {
        fontSize: 16,
        color: '#777',
    },
    followers: {
        fontSize: 16,
        color: '#777',
    },
    artistImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginVertical: 8,
    },
    resultsText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 16,
        color: '#333',
    },
    trackResultItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: '#f5f5f5',
        padding: 12,
        borderRadius: 8,
        elevation: 2,
    },
    albumThumbnail: {
        width: 70,
        height: 70,
        marginRight: 10,
        borderRadius: 8,
    },
    placeholderImage: {
        width: 70,
        height: 70,
        borderRadius: 8,
        backgroundColor: '#ddd',
    },
    trackInfo: {
        flex: 1,
    },
    trackName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111',
        marginBottom: 4,
    },
    albumName: {
        fontSize: 14,
        color: '#777',
    },
    releaseDate: {
        fontSize: 12,
        color: '#777',
    },
});

export default SearchArtistSongsScreen;
