import { takeLatest,put,call } from "redux-saga/effects";
import { CREATE_SONG_REQUEST, createSongFailure, createSongSuccess } from "../Actions/CreateSongsActions";
import axiosInstance from "../Components/AxiosInstance";


function createSong(data){
    console.log(axiosInstance);
  //  return axiosInstance.post('/songs/create', data);
    try{
        return axiosInstance.post("/songs/create",data);
    }
catch(e){
    throw new Error("can't fetch data");
}}
// async function createSong(data) {
//     console.log(data);
//     console.log('helijshfjsfksjfklsjfklshg');
//     try {
//         const response = await fetch('http://127.0.0.1:8000/api/songs/create', {
//             method: 'POST',
//             headers: {
//                  //'Content-Type': 'multipart/form-data' //is not needed with fetch, as the browser will automatically set the correct boundary.
//                 // 'Authorization': `Bearer ${token}`, // Include this if authentication is required
//             },
//             body: data
//         });

//         if (!response.ok) {
//             const errorDetails = await response.text();
//             console.error('Error details:', errorDetails);
//             throw new Error('Failed to upload song' + errorDetails);
//         }

//         const result = await response.json();
//         return result;
//     } catch (e) {
//         throw new Error("Can't fetch data" + e.message);
//     }
// }





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