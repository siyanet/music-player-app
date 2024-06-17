import { all } from 'redux-saga/effects';
import songsSaga from './SongsSaga';
import { updateSongSaga } from './UpdateSongSaga';


export default function* rootSaga() {
    yield all([
     songsSaga(),
     updateSongSaga(),
      // Add other sagas here
    ]);
  }