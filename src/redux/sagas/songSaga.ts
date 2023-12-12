import { call, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
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

function* getSongs(): SagaIterator {
    const getSongsFromApi = () => axios.get('');
    const songs = yield call(getSongsFromApi);

    yield put ({
        type: 'SET_SONGS',
        payload: songs.data
    })
};

function* editSongMoodsSaga(action: EditSongMoodsAction){
    console.log('in editSong saga:', action.payload)
    try {
        // const songId = action.payload.id;

        yield axios({
            method: 'POST',
            url: 'http://localhost:3000/api/songs', 
            data: action.payload
        })

        // yield put({
        //     type: 'GET_SONGS'
        // })
    }
    catch (error) {
        console.log('Error with edit song moods saga:', error);
    }
}

function* songSaga(){
    yield takeLatest('EDIT_SONG_MOODS', editSongMoodsSaga);
    yield takeLatest('GET_SONGS', getSongs)
}

export default songSaga