import { takeEvery,call, put } from "redux-saga/effects";
import { GET_SONGS_FETCH, getSongsFailure, getSongsSuccess } from "../Actions/SongsActions";

function songsFetch(){
    return fetch("https://jsonplaceholder.typicode.com/albums").then((response) => response.json());
}

function* workerFetchSongs(){
    try{
        const songs = yield call(songsFetch);
        yield put(getSongsSuccess(songs));
    }
    catch(e){
        yield put(getSongsFailure(e.message));
    }
}
function* songsSaga(){
    yield takeEvery(GET_SONGS_FETCH,workerFetchSongs);
}
export default songsSaga;