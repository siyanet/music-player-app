import { takeLatest,call,put } from "redux-saga/effects";
import { DELETE_SONG_REQUEST, deleteSongFailure, deleteSongRequest, deleteSongSuccess } from "../Actions/deleteSongAction";
import axiosInstance from "../Components/AxiosInstance";

function deleteSong(songId){
    return axiosInstance.delete(`/songDelete/${songId}/`);

}
function* deleteSongWorker(action){
    const songId = action.payload.payload;
    console.log(songId);
    try{
        const song = yield call(deleteSong,songId);
        yield put(deleteSongSuccess(song));
    }
    catch(e){
        yield put(deleteSongFailure(e.message));
    }

}
function* deleteSongSaga(){
    yield takeLatest(DELETE_SONG_REQUEST,deleteSongWorker);

}
export default deleteSongSaga;