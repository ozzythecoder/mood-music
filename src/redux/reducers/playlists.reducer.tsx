
type SetPlaylistsAction = {
    type: 'SET_PLAYLISTS';
    payload: string[];
}

const playlists = (state = [], action: SetPlaylistsAction) => {
    switch (action.type) {
        case "SET_PLAYLISTS":
            return action.payload;
        default:
            return state;
    }
};
export default playlists;