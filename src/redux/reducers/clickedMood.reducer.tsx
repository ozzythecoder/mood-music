type SetClickedMoodAction = {
    type: 'SET_CLICKED_MOOD';
    payload: string;
   }
  
   const clickedMood = (state = [], action: SetClickedMoodAction) => {
    switch (action.type) {
      case "SET_CLICKED_MOOD":
        return action.payload;
      default:
        return state;
    }
  };
  export default clickedMood;