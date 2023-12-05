type SetClickedSongAction = {
  type: 'SET_CLICKED_SONG';
  payload: string;
 }
 
 type SetSongsAction = {
  type: 'SET_SONGS';
  payload: string[];
 }

 type Action = SetClickedSongAction | SetSongsAction;

 const clickedSong = (state = [], action: Action) => {
  switch (action.type) {
    case "SET_CLICKED_SONG":
      return action.payload;
    case "SET_SONGS":
      return action.payload;
    default:
      return state;
  }
};
export default clickedSong;
