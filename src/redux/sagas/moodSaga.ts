import { put, takeLatest, call } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
   

function* getMoods() {
try {
    const response: AxiosResponse = yield call(axios.get, 'http://localhost:3000/api/moods');
    
    yield put ({
        type: 'SET_MOODS',
        payload: response.data
    })
}
catch (error) {
    console.log('Error with get moods saga:', error);
}
};

function* moodSaga(){
    yield takeLatest('GET_MOODS', getMoods)
}

export default moodSaga