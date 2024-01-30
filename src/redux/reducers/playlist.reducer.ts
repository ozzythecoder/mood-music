import { DispatchAction } from "../definitions.redux";

type SetNewPlaylistAction = DispatchAction<"SET_NEW_PLAYLIST", string[]>;

const newPlaylist = (state = [], action: SetNewPlaylistAction) => {
    switch (action.type) {
        case "SET_NEW_PLAYLIST":
            return action.payload;
        default:
            return state;
    }
};
export default newPlaylist;
