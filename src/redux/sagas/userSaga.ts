import axios, { AxiosResponse } from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';


function* fetchUser() {
  console.log("IN FETCH USER SAGA....")
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const response: AxiosResponse = yield call(axios.get, "http://192.168.68.57:3000/api/user", config)

    console.log("RES:  ", response)

    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
}

export default userSaga;