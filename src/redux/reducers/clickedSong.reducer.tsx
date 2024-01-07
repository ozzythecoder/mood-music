type SetClickedSongAction = {
  type: 'SET_CLICKED_SONG';
  payload: string;
 }

 const clickedSong = (state = [], action: SetClickedSongAction) => {
  switch (action.type) {
    case "SET_CLICKED_SONG":
      return action.payload;
    default:
      return state;
  }
};
export default clickedSong;
