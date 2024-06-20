import { takeLatest,put,call } from "redux-saga/effects";
import { CREATE_SONG_REQUEST, createSongFailure, createSongSuccess } from "../Actions/CreateSongsActions";


function createSong(data){
    
    return fetch(`http://127.0.0.1:8000/api/songs/`,{
        method: 'POST',
        body: data
 } ).then((response) => {
    if (!response.ok) {
        return response.json().then(errorData => {
            throw new Error(errorData.detail || 'Something went wrong');
        });
    }
    
   return  response.json()});


}
function* createSongWorker(action){
    const formData = action.payload;
    try{
        const song = yield call(createSong,formData);
        yield put(createSongSuccess(song));
    }
    catch(e){
        yield put(createSongFailure(e.message));
    }

}
function* createSongSaga(){
    yield takeLatest(CREATE_SONG_REQUEST,createSongWorker);
}
export default createSongSaga;