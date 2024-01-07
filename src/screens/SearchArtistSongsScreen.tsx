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

    // formatting to show followers in terms of thousands or millions
    const formatFollowers = (followers: number): string => {
        if (followers >= 1000000) {
            return (followers / 1000000).toFixed(1) + 'M Followers';
        } else if (followers >= 1000) {
            return (followers / 1000).toFixed(1) + 'K Followers';
        } else {
            return followers + ' Followers';
        }
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
        <View style={styles.container}>
            {artistInfo && (
                <View style={styles.artistHeaderContainer}>
                    <Text style={styles.artistNameHeader}>{artistInfo.name}</Text>
                    {artistInfo.images && artistInfo.images.length > 0 && (
                        <Image source={{ uri: artistInfo.images[0].url }} style={styles.artistImageHeader} />
                    )}
                    {artistInfo.genres && <Text style={styles.genresHeader}>Genres: {artistInfo.genres.join(', ')}</Text>}
                    {artistInfo.followers && <Text style={styles.followersHeader}>{formatFollowers(artistInfo.followers.total)}</Text>}
                </View>
            )}
            <Text style={styles.sectionTitle}>Top Tracks by {artistInfo?.name}</Text>
            {topTrackResults.length > 0 ? (
                <FlatList
                    data={topTrackResults}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleTrackClick(item)}>
                            <View style={styles.trackItem}>
                                {item.album.images.length > 0 ? (
                                    <Image
                                        style={styles.albumThumbnail}
                                        source={{ uri: item.album.images[0].url }}
                                    />
                                ) : (
                                    <View style={styles.placeholderImage} />
                                )}
                                <View style={styles.trackInfo}>
                                    <Text style={styles.trackName} numberOfLines={2}>{item.name}</Text>
                                    <Text style={styles.albumName} numberOfLines={2}>{item.album.name}</Text>
                                    <Text style={styles.releaseYear}>{item.album.release_date.substring(0, 4)}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            ) : (
                <Text style={styles.noTracksText}>No top tracks</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 18,
    },
    artistHeaderContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    artistNameHeader: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    genresHeader: {
        fontSize: 15,
        color: '#777',
        marginBottom: 8,
    },
    followersHeader: {
        fontSize: 15,
        color: '#777',
        marginBottom: 8,
    },
    artistImageHeader: {
        width: 120,
        height: 120,
        borderRadius: 25,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 18,
    },
    // tracks styling
    trackItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    albumThumbnail: {
        width: 70,
        height: 70,
        marginRight: 10,
        borderRadius: 10,
    },
    placeholderImage: {
        width: 100,
        height: 100,
        borderRadius: 20,
        backgroundColor: '#ddd',
    },
    trackInfo: {
        flex: 1,
    },
    trackName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111',
        marginBottom: 4,
    },
    albumName: {
        fontSize: 16,
        color: '#555',
    },
    releaseYear: {
        fontSize: 14,
        color: '#000',
    },
    noTracksText: {
        fontSize: 16,
        color: '#777',
    },
});


export default SearchArtistSongsScreen;
