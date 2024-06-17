import { takeLatest } from "redux-saga/effects";
import { Update_SONG_FAILURE, updateSong } from "../Actions/UpdateSongsActions";


function* update(action){
    const {songId,updatedData} = action.payload;
    try{
        const response = yield call(fetch, `${API_URL}${songId}/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
          });
          if(response.ok){
            yield put({
                type: Update_SONG_SUCCESS,
                payload: {songId,updateSong},


            });
            const updateSong = yield response.json();
            

          }
          else{
            throw new Error(updateSong.detail ||'Failed to update song')
          }
    }
    catch(e){
        yield put({
            type: Update_SONG_FAILURE,
            payload: {songId,error: error.message},
        });
    }

}
export function* updateSongSaga(){
    yield takeLatest(UPDATE_SONG_REQUEST,update);
}
