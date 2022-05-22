import { call, delay, fork, put, takeEvery } from 'redux-saga/effects';
import { getApi } from './store';
import { actions } from './store';

function* getUsersFetchWorker() {
  try {
    // const response = yield call(() => fetch(getApi()));
    const response = yield call(fetch, getApi());
    // const users = yield call(() => response.json());
    const users = yield call([response, response.json]);
    console.log('users: ', users);
    yield put(actions.getUsersSuccess(users));
  } catch (error) {
    yield put(actions.getUsersFailure(error.message));
  }
}

function* clearUsers() {
  console.log('clearing');
}

function* onLoad() {
  yield delay(2000);
  console.log('auth is ok');
}

function* usersSaga() {
  yield takeEvery('users/getUsersFetch', getUsersFetchWorker);
  yield takeEvery('users/clearUsers', clearUsers);
  yield fork(onLoad);
}

export default usersSaga;
