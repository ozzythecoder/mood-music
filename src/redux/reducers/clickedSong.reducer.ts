import type { Track } from "@src/definitions";
import { DispatchAction } from "../definitions.redux";

// clickedSong reducer is currently used to tag moods to songs on the SongMoodModal

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

type SetClickedSongAction = DispatchAction<"SET_CLICKED_SONG", string>;

const clickedSong = (state: Track | null = null, action: SetClickedSongAction) => {
    switch (action.type) {
        case "SET_CLICKED_SONG":
            return action.payload;
        default:
            return state;
    }
};

export default clickedSong;
