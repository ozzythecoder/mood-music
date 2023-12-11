
   type SetSongsAction = {
    type: 'SET_SONGS';
    payload: string[];
   }
  
   const songs = (state = [], action: SetSongsAction) => {
    switch (action.type) {
      case "SET_SONGS":
        return action.payload;
      default:
        return state;
    }
  };
  export default songs;