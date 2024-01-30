import { DispatchAction } from "../definitions.redux";

// Set to type "any" since we don't have a proper shape for API returns yet
type SetSongsAction = DispatchAction<"SET_SONGS", any>;

const songs = (state = [], action: SetSongsAction) => {
    switch (action.type) {
        case "SET_SONGS":
            return action.payload;
        default:
            return state;
    }
};

export default songs;
