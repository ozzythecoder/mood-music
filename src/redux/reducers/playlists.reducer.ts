import { DispatchAction } from "../definitions.redux";

type SetPlaylistsAction = DispatchAction<"SET_PLAYLISTS", string[]>;

const playlists = (state = [], action: SetPlaylistsAction) => {
    switch (action.type) {
        case "SET_PLAYLISTS":
            return action.payload;
        default:
            return state;
    }
};
export default playlists;
