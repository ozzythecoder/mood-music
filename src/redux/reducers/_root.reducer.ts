import { combineReducers } from 'redux';
import clickedSong from './song.reducer';

// rootReducer is the primary reducer for our entire project
// This is imported in index.js as rootSaga'
const rootReducer = combineReducers({
clickedSong,
});

export default rootReducer;
