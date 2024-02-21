import {all, put, takeLatest, call} from 'redux-saga/effects';
import axios, {AxiosResponse} from 'axios';

type LoginUserAction = {
    type: string,
    payload: {
        username: string,
        password: string
    }
}

function* loginSaga(action: LoginUserAction){
    try {
        console.log("IN LOGIN....", action.payload)
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          };
        yield call(axios.post, 'http://192.168.68.57:3000/api/user/login', action.payload, config)

        yield put({ type: 'FETCH_USER' });

    } catch(e:any){
        console.log(e.message);
    }
}


function* authSaga(){
    yield all([takeLatest('LOGIN', loginSaga)])
}

export default authSaga;
