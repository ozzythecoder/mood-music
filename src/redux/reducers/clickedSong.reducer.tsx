// updated reducer to include specific type of Track.  Can revert if desired:

// type SetClickedSongAction = {
//   type: 'SET_CLICKED_SONG';
//   payload: string;
//  }

//  const clickedSong = (state = [], action: SetClickedSongAction) => {
//   switch (action.type) {
//     case "SET_CLICKED_SONG":
//       return action.payload;
//     default:
//       return state;
//   }
// };
// export default clickedSong;

interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string }[];
  };
}

type SetClickedSongAction = {
  type: 'SET_CLICKED_SONG';
  payload: Track;
}

const clickedSong = (state: Track | null = null, action: SetClickedSongAction) => {
  switch (action.type) {
    case "SET_CLICKED_SONG":
      return action.payload;
    default:
      return state;
  }
};

export default clickedSong;