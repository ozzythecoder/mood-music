import { call, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import axios, { AxiosResponse} from 'axios';
   
   type EditSongMoodsAction = {
    type: 'EDIT_SONG_MOODS';
    payload: {
        id: number;
        title: string;
    };
   }

function* getDBSongs(): SagaIterator {
    const getSongsFromDB = () => axios.get('http://localhost:3000/api/songs');
    const songs = yield call(getSongsFromDB);

    yield put ({
        type: 'SET_SONGS',
        payload: songs.data
    })
};

function* editSongMoodsSaga(action: EditSongMoodsAction){
    try {
        const songId = action.payload.id;

        yield axios({
            method: 'PUT',
            url: ``,
        })

        yield put({
            type: 'GET_DB_SONGS'
        })
    }
    catch (error) {
        console.log('Error with edit song moods saga:', error);
    }
}

function* clipSaga(){
    yield takeLatest('EDIT_SONG_MOODS', editSongMoodsSaga);
    yield takeLatest('GET_DB_SONGS', getDBSongs)
}

export default editSongMoodsSaga