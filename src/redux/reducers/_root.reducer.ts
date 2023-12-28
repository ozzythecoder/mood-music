import { combineReducers } from 'redux';
import clickedSong from './clickedSong.reducer';
import songs from './songs.reducer'
import moods from './moods.reducer';
import spotify from './spotify.reducer'

// rootReducer is the primary reducer for our entire project
// This is imported in index.js as rootSaga'
const rootReducer = combineReducers({
    clickedSong,
    songs,
    moods,
    spotify,
});

export default rootReducer;
