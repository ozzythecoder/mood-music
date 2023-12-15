import { put, takeLatest } from 'redux-saga/effects';
import axios  from 'axios';
   
   type EditSongMoodsAction = {
    type: string;
    payload: {
        moods: {
            moodName: string,
            color: string,
        }[],
        song: {
            _id: string,
            artist: string,
            title: string,
        }
    };
   }

function* getDBSongs() {
try {
    const response = yield axios.get('http://localhost:3000/api/songs');
    
    yield put ({
        type: 'SET_SONGS',
        payload: response.data
    })
}
catch (error) {
    console.log('Error with get songs saga:', error);
}
};

function* editSongMoodsSaga(action: EditSongMoodsAction){
    console.log('in editSong saga:', action.payload)
    try {
        // const songId = action.payload.id;

        yield axios({
            method: 'PUT',
            url: 'http://localhost:3000/api/songs', 
            data: action.payload
        })
        yield put({
            type: 'GET_DB_SONGS'
        })
    }
    catch (error) {
        console.log('Error with edit song moods saga:', error);
    }
}

function* songSaga(){
    yield takeLatest('EDIT_SONG_MOODS', editSongMoodsSaga);
    yield takeLatest('GET_DB_SONGS', getDBSongs)
}

export default songSaga