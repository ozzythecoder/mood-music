type SelectedPlaylistAction = {
    type: 'SET_SELECTED_PLAYLIST';
    payload: string;
}

const selectedPlaylist = (state = [], action: SelectedPlaylistAction) => {
    switch (action.type) {
        case "SET_SELECTED_PLAYLIST":
            return action.payload;
        default:
            return state;
    }
};
export default selectedPlaylist;
