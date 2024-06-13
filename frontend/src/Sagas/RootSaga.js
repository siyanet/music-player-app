import { all } from 'redux-saga/effects';
import songsSaga from './SongsSaga';


export default function* rootSaga() {
    yield all([
     songsSaga(),
      // Add other sagas here
    ]);
  }