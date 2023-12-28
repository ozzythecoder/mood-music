import { combineReducers } from "@reduxjs/toolkit";

type SetSpotifyAction = {
    type: string;
    payload: string;
}

const accessToken = (state = '', action: SetSpotifyAction) => {
    switch (action.type) {
        case "SET_ACCESS_TOKEN":
            return action.payload;
        default:
            return state;
    }
};

export default combineReducers({
    accessToken,
});