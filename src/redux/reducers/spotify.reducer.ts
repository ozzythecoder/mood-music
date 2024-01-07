import { combineReducers } from "@reduxjs/toolkit";

// defining the action type for setting the Spotify access token
type SetSpotifyAction = {
    type: string;
    payload: {
        accessToken: string;
        expirationDate: Date | null;
    };
};

// defining the initial state for the auth reducer
const initialState = {
    accessToken: '', // initial value for the access token
    expirationDate: null as Date | null, // initial value for the expiration date
};

// reducer to manage access token and expiration date
const accessToken = (state = initialState, action: SetSpotifyAction) => {
    switch (action.type) {
        case "SET_ACCESS_TOKEN":
            // updating the state with the new access token and expiration date
            return {
                ...state,
                accessToken: action.payload.accessToken,
                expirationDate: action.payload.expirationDate,
            };
        default:
            return state;
    }
};

type SetClickedArtistIdAction = {
    type: string;
    payload: string;
};

// Reducer only for Artist ID when clicking on searched artist
const searchedArtistId = (state = '', action: SetClickedArtistIdAction) => {
    switch (action.type) {
        case 'SET_CLICKED_ARTIST_ID':
            return action.payload;
        default:
            return state;
    }
};

interface Artist {
    id: string;
    name: string;
    images?: { height: number; url: string; width: number }[];
    followers?: { href: null; total: number };
    genres?: string[];
}

// defining the action type for setting the artist info
type SetArtistInfoAction = {
    type: string;
    payload: Artist; // Assuming Artist is the type for detailed artist information
};


// defining the action type for setting albums and songs
type SetAlbumsAndSongsAction = {
    type: string;
    payload: any[]; // Replace any with the actual type for albums and songs
};

// Reducer to manage detailed artist information
const artistInfo = (state = null as Artist | null, action: SetArtistInfoAction) => {
    switch (action.type) {
        case 'SET_ARTIST_INFO':
            return action.payload;
        default:
            return state;
    }
};

type Song = {
    name: string;
};

type Album = {
    name: string;
    releaseDate: number;
    coverArt: string;
};

type SetArtistTopTracks = {
    type: 'SET_ARTIST_TOP_TRACKS';
    payload: {
        tracks: {
            name: string;
            album: Album;
        }[];
    };
};

// Reducer to manage top songs
const artistTopTracks = (
    state: { tracks: { name: string; album: Album }[] } = { tracks: [] },
    action: SetArtistTopTracks
) => {
    switch (action.type) {
        case 'SET_ARTIST_TOP_TRACKS':
            return {
                tracks: action.payload.tracks.slice(0, 10),
            };
        default:
            return state;
    }
};

// Reducer to manage albums and songs
const albumsAndSongs = (state = [] as any[], action: SetAlbumsAndSongsAction) => {
    switch (action.type) {
        case 'SET_ALBUMS_AND_SONGS':
            return action.payload;
        default:
            return state;
    }
};

export default combineReducers({
    accessToken,
    searchedArtistId,
    artistInfo,
    artistTopTracks,
    albumsAndSongs,
});