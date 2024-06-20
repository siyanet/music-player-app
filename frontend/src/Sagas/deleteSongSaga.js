import { takeLatest,call,put } from "redux-saga/effects";
import { DELETE_SONG_REQUEST, deleteSongFailure, deleteSongRequest, deleteSongSuccess } from "../Actions/deleteSongAction";


function deleteSong(songId){
    return fetch(`http://127.0.0.1:8000/api/songDelete/${songId}/`, {
        method: 'DELETE',
 } ).then(response => {
    if(!response.ok){
        return response.json().then(errorData =>{
            throw new Error(errorData.message || errorData.detail || "failed to delete the song");
        });
     } 
     return response.json();
    
    }
 )

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