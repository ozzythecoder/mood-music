import { combineReducers } from 'redux';
import clickedSong from './clickedSong.reducer';
import songs from './songs.reducer'
import moods from './moods.reducer';
import clickedMood from './clickedMood.reducer';
import newPlaylist from './playlist.reducer';
import spotify from './spotify.reducer'

// rootReducer is the primary reducer for our entire project
// This is imported in index.js as rootSaga'
const rootReducer = combineReducers({
clickedSong,
songs,
moods,
clickedMood,
newPlaylist,
spotify,
});

export default rootReducer;
