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

function* getSongs(): SagaIterator {
    const getSongsFromApi = () => axios.get('');
    const songs = yield call(getSongsFromApi);

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
            type: 'GET_SONGS'
        })
    }
    catch (error) {
        console.log('Error with edit song moods saga:', error);
    }
}

function* clipSaga(){
    yield takeLatest('EDIT_SONG_MOODS', editSongMoodsSaga);
    yield takeLatest('GET_SONGS', getSongs)
}

export default editSongMoodsSaga