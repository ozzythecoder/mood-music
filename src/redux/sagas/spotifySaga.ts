import { put, takeLatest, call } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';


function* getAccessToken() {
    try {
        const response: AxiosResponse = yield call(axios.post, 'http://localhost:3000/api/spotify');
        const accessToken = response.data.access_token;
        console.log('access token is:', accessToken);

        // then we dispatch an action to update the Redux state with the access token
        yield put({
            type: 'SET_ACCESS_TOKEN',
            payload: accessToken
        })
    }
    catch (error) {
        console.log('Error with get spotify saga fetch POST:', error);
    }
};

function* spotifySaga() {
    yield takeLatest('FETCH_SPOTIFY_ACCESS_TOKEN', getAccessToken)
}

export default spotifySaga;