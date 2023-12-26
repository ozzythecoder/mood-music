import { call, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse} from 'axios';
   
   type EditSongMoodsAction = {
    type: string;
    payload: {
        moods: {
            moodName: string,
            color: string,
        }[],
        song: {
            artist: string,
            title: string,
        }
    };
   }

function* getDBSongs() {
try {
    const response: AxiosResponse = yield call(axios.get, 'http://localhost:3000/api/songs');
    
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

        yield call(axios.put, 'http://localhost:3000/api/songs', action.payload);
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