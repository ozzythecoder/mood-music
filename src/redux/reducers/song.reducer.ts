const clickedSong = (state = [], action) => {
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
