import { takeEvery,call, put } from "redux-saga/effects";
import { GET_SONGS_FETCH, getSongsFailure, getSongsSuccess } from "../Actions/GetSongsActions";

function songsFetch(){
    try{
    return fetch("http://127.0.0.1:8000/api/songs/").then((response) => response.json());
    }
catch(e){
    throw new Error("can't fetch data");
}}

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