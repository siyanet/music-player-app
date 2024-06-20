import { all } from 'redux-saga/effects';
import songsSaga from './FetchSongsSaga';
import { updateSongSaga } from './UpdateSongSaga';
import createSongSaga from './CreateSongSaga';
import deleteSongSaga from './deleteSongSaga';


export default function* rootSaga() {
    yield all([
     songsSaga(),
     updateSongSaga(),
     createSongSaga(),
     deleteSongSaga(),
      // Add other sagas here
    ]);
  }