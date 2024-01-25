// Spotify Search component which handles the Artist and Track searches.
// Artist search directly uses SearchArtistSongsScreen as well

// TODO: This page could use a significant refactor.

import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Image } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import type { Artist, Track } from "@src/definitions";

function SpotifySearch({ navigation }: { navigation: any }) {
    const [artistSearchInput, setArtistSearchInput] = useState<string>("");
    const [trackSearchInput, setTrackSearchInput] = useState<string>("");
    const [artistSearchResults, setArtistSearchResults] = useState<Artist[]>([]);
    const [trackSearchResults, setTrackSearchResults] = useState<Track[]>([]);
    const [tab, setTab] = useState<"artist" | "track">("artist");

    // using useSelector to get the accessToken from the Redux store
    const accessToken = useSelector((store: any) => store.spotify.accessToken.accessToken);
    // not sure if needed, but can be used to see if we need a new access token
    const accessTokenExpDate
        = useSelector((store: any) => store.spotify.accessToken.expirationDate);
    const dispatch = useDispatch();

    const handleTabChange = (selectedTab: "artist" | "track") => {
        setTab(selectedTab);

        // this clears the results of the other tab once clicked.
        // Can be removed if we want to keep those results up, or can create a Clear button
        if (selectedTab === "artist") {
            setTrackSearchResults([]);
        } else {
            setArtistSearchResults([]);
        }
    };

    // Search for tracks based on artist name or track name
    const handleSearch = async () => {
        console.log("inside handleSearch, searching for", artistSearchInput);
        if (tab === "artist") {
            // perform artist search here
            console.log("Searching for artists:", artistSearchInput);

            const artistParameters = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken,
                },
            };

            try {
                const response = await fetch(
                    `https://api.spotify.com/v1/search?q=${artistSearchInput}&type=artist&limit=8`,
                    artistParameters,
                );

                console.log("Full search response:", response);

                const data: { artists: { items: Artist[] } } = await response.json();
                console.log("Data:", data);

                setArtistSearchResults(data.artists.items);
            } catch (error) {
                console.log("Error fetching artist search results:", error);
            }

            setArtistSearchInput("");
        } else {
            // perform track search here
            console.log("Searching for tracks:", trackSearchInput);

            const trackParameters = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken,
                },
            };

            try {
                const response = await fetch(
                    `https://api.spotify.com/v1/search?q=${trackSearchInput}&type=track&limit=10`,
                    trackParameters,
                );

                const data: { tracks?: { items?: Track[] } } = await response.json();
                if (data.tracks && data.tracks.items) {
                    setTrackSearchResults(data.tracks.items);
                } else {
                    console.log("No track results found");
                }
            } catch (error) {
                console.log("Error fetching track search results:", error);
            }
            setTrackSearchInput("");
        }
    };

    // when artist search result is clicked, dispatches clicked artist ID
    const handleArtistClick = (artistId: string) => {
    // console.log("artistId is:", artistId)
        dispatch({
            type: "SET_CLICKED_ARTIST_ID",
            payload: artistId,
        });
        navigation.navigate("SearchArtistSongsScreen");
    };

    // formatting to show followers in terms of thousands or millions
    const formatFollowers = (followers: number): string => {
        if (followers >= 1000000) {
            return (followers / 1000000).toFixed(1) + "M Followers";
        } else if (followers >= 1000) {
            return (followers / 1000).toFixed(1) + "K Followers";
        } else {
            return followers + " Followers";
        }
    };

    // track search - send Track to clickedSong reducer and go to SongMoodModal
    const handleTrackClick = (track: Track) => {
        dispatch({
            type: "SET_CLICKED_SONG",
            payload: track,
        });
        navigation.navigate("SongMoodModal");
    };

    return (
        <View style={styles.container}>
            {/* Tab Buttons */}
            {/* Search Text and Tab Buttons */}
            <View style={styles.searchTextContainer}>
                <Text style={styles.searchText}>Search tracks by </Text>
                <TouchableOpacity
                    style={[styles.tabButton, tab === "artist" ? styles.activeTab : null]}
                    onPress={() => handleTabChange("artist")}
                >
                    <Text style={styles.tabButtonText}>Artist</Text>
                </TouchableOpacity>
                <Text style={styles.searchText}> or </Text>
                <TouchableOpacity
                    style={[styles.tabButton, tab === "track" ? styles.activeTab : null]}
                    onPress={() => handleTabChange("track")}
                >
                    <Text style={styles.tabButtonText}>Track</Text>
                </TouchableOpacity>
                <Text style={styles.searchText}> Name</Text>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={`Search for ${tab === "artist" ? "artist" : "track"}`}
                    placeholderTextColor="#777"
                    value={tab === "artist" ? artistSearchInput : trackSearchInput}
                    onChangeText={(text) => (tab === "artist" ? setArtistSearchInput(text) : setTrackSearchInput(text))}
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Ionicons name="search" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Search Results */}

            {/* Artist Search Results */}
            {tab === "artist" ? (
                artistSearchResults.length > 0
                    ? (
                        <FlatList
                            data={artistSearchResults}
                            keyExtractor={(item) => item.id}
                            numColumns={2}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleArtistClick(item.id)}>
                                    <View style={styles.artistResultItem}>
                                        {item.images && item.images.length > 0
                                            ? (
                                                <Image
                                                    source={{ uri: item.images[0]?.url }}
                                                    style={styles.artistImage}
                                                />
                                            )
                                            : (
                                                <View style={styles.placeholderImage} />
                                            )}
                                        <Text style={styles.artistNameSearch}>{item.name}</Text>
                                        <Text style={styles.artistFollowers}>
                                            {item.followers ? formatFollowers(item.followers.total) : null}
                                        </Text>
                                        <Text style={styles.artistGenres}>
                                            {item.genres ? item.genres.slice(0, 3).join(", ") : null}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    ) : (
                        <Text style={styles.noResultsText}>No artist results found</Text>
                    )
            ) : (

            // (if tab isn't 'artist' show Track Search Results)

                trackSearchResults.length > 0
                    ? (
                        <FlatList
                            data={trackSearchResults.slice(0, 10)}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleTrackClick(item)}>
                                    <View style={styles.trackResultItem}>
                                        {item.album.images.length > 0
                                            ? (
                                                <Image
                                                    style={styles.albumThumbnail}
                                                    source={{ uri: item.album.images[0].url }}
                                                />
                                            )
                                            : (
                                                <View style={styles.placeholderImage} />
                                            )}
                                        <View style={styles.trackInfo}>
                                            <Text style={styles.trackName} numberOfLines={2}>{item.name}</Text>
                                            <Text style={styles.artistName} numberOfLines={2}>{item.artists.map(artist => artist.name).join(", ")}</Text>
                                            <Text style={styles.albumName}>{item.album.name}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    )
                    : (
                        <Text style={styles.noResultsText}>No track results found</Text>
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
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    searchText: {
        fontSize: 16,
    },
    tabButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: "#ddd",
    },
    activeTab: {
        backgroundColor: "tomato",
    },
    tabButtonText: {
        color: "white",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 12,
        color: "#333",
        backgroundColor: "#fff",
    },
    searchButton: {
        backgroundColor: "tomato",
        padding: 10,
        borderRadius: 8,
        marginLeft: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    // artist search results styling
    artistResultItem: {
        width: 150,
        height: 200,
        margin: 8,
    },
    artistImage: {
        width: "100%",
        height: 100,
        borderRadius: 20,
    },
    placeholderImage: {
        width: "100%",
        height: 100,
        borderRadius: 20,
        backgroundColor: "#ddd",
    },
    artistNameSearch: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 8,
        marginBottom: 4,
    },
    artistFollowers: {
        fontSize: 16,
        color: "#555",
    },
    artistGenres: {
        fontSize: 14,
        color: "#777",
    },
    noResultsText: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 16,
        color: "#333",
    },
    // track search results styling
    trackResultItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    albumThumbnail: {
        width: 70,
        height: 70,
        marginRight: 10,
        borderRadius: 10,
    },
    trackInfo: {
        flex: 1,
    },
    trackName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#111",
        marginBottom: 4,
    },
    artistName: {
        fontSize: 16,
        color: "#555",
    },
    albumName: {
        fontSize: 14,
        color: "#777",
    },
});

export default SpotifySearch;
