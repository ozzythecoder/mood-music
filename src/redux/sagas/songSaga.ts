import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getSongs() {
    const songs = yield axios.get('')

    yield put ({
        type: 'SET_SONGS',
        payload: songs.data
    })
};

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
    yield takeLatest('GET_SONGS', getSongs)
}

export default editSongMoodsSaga