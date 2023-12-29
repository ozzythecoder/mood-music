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

export default combineReducers({
    accessToken,
});