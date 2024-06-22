import { takeLatest,put,call } from "redux-saga/effects";
import { CREATE_SONG_REQUEST, createSongFailure, createSongSuccess } from "../Actions/CreateSongsActions";
import axiosInstance from "../Components/AxiosInstance";


function createSong(data){
    return axiosInstance.post('/songs/', data);
    


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