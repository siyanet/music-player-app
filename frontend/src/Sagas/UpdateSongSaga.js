import { takeLatest,put,call } from "redux-saga/effects";
import { UPDATE_SONG_FAILURE,UPDATE_SONG_REQUEST, UPDATE_SONG_SUCCESS } from "../Actions/UpdateSongsActions";

 function updateSong(songId, updatedData) {
   console.log(songId);
    return fetch(`http://127.0.0.1:8000/api/songUpdate/${songId}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                throw new Error(errorData.message || errorData.detail || 'Failed to update song');
            });
        }
        return response.json();
    })
    .catch(e => {
        throw new Error("can't fetch data: " + e.message);
    });
}

function* update(action) {
    const { payload } = action.payload;
    try {
        const updatedData = { title: payload.updatedTitle, artist: payload.updatedArtist };
        const updatedSong = yield call(updateSong, payload.songId, updatedData);
        
        yield put({
            type: UPDATE_SONG_SUCCESS,
            payload: updatedSong,
        });
    } catch (e) {
        yield put({
            type: UPDATE_SONG_FAILURE,
            payload: { error: e.message },
        });
    }
}

export function* updateSongSaga() {
    yield takeLatest(UPDATE_SONG_REQUEST, update);
}

