import { combineReducers } from "@reduxjs/toolkit";
import type { DispatchAction, SpotifyToken } from "../definitions.redux";
import type { Artist } from "../../definitions";

// defining the action type for setting the Spotify access token

type SetSpotifyAction =
    DispatchAction<"SET_ACCESS_TOKEN", SpotifyToken>;

// defining the initial state for the auth reducer
const initialState: SpotifyToken = {
    accessToken: "", // initial value for the access token
    expirationDate: null, // initial value for the expiration date
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

type SetClickedArtistIdAction =
    DispatchAction<"SET_CLICKED_ARTIST_ID", string>;

// Reducer only for Artist ID when clicking on searched artist
const searchedArtistId = (state = "", action: SetClickedArtistIdAction) => {
    switch (action.type) {
        case "SET_CLICKED_ARTIST_ID":
            return action.payload;
        default:
            return state;
    }
};

// defining the action type for setting the artist info
type SetArtistInfoAction =
    DispatchAction<"SET_ARTIST_INFO", Artist>;

// Reducer to manage detailed artist information
const artistInfo = (state = null as Artist | null, action: SetArtistInfoAction) => {
    switch (action.type) {
        case "SET_ARTIST_INFO":
            return action.payload;
        default:
            return state;
    }
};

export default combineReducers({
    accessToken,
    searchedArtistId,
    artistInfo,
});
