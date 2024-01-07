type SetMoodsAction = {
    type: 'SET_MOODS';
    payload: string[];
   }
  
   const moods = (state = [], action: SetMoodsAction) => {
    switch (action.type) {
      case "SET_MOODS":
        return action.payload;
      default:
        return state;
    }
  };
  export default moods;