import { all } from 'redux-saga/effects';
import songSaga from './songSaga';
import moodSaga from './moodSaga';
import authSaga from './loginSaga';
import userSaga from './userSaga';


// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga
export default function* rootSaga() {
  yield all([
    songSaga(),
    moodSaga(),
    authSaga(),
    userSaga()
  ]);
}
