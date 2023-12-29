
type SetNewPlaylistAction = {
    type: 'SET_NEW_PLAYLIST';
    payload: string[];
   }
  
   const newPlaylist = (state = [], action: SetNewPlaylistAction) => {
    switch (action.type) {
      case "SET_NEW_PLAYLIST":
        return action.payload;
      default:
        return state;
    }
  };
  export default newPlaylist;