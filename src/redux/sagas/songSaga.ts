import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* editSongMoodsSaga(action) {
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



function* clipSaga() {
    yield takeLatest('EDIT_SONG_MOODS', editSongMoodsSaga);
}

export default editSongMoodsSaga