import { DispatchAction } from "../definitions.redux";

type SelectedPlaylistAction = DispatchAction<"SET_SELECTED_PLAYLIST", string>;

const selectedPlaylist = (state = [], action: SelectedPlaylistAction) => {
    switch (action.type) {
        case "SET_SELECTED_PLAYLIST":
            return action.payload;
        default:
            return state;
    }
};
export default selectedPlaylist;
