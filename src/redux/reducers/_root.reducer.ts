import { combineReducers } from 'redux';
import clickedSong from './clickedSong.reducer';
import songs from './songs.reducer';
import moods from './moods.reducer';
import user from './userReducer';


// rootReducer is the primary reducer for our entire project
// This is imported in index.js as rootSaga'
const rootReducer = combineReducers({
clickedSong,
songs,
moods,
user
});

export type AuthState = ReturnType<typeof rootReducer>;

export default rootReducer;
