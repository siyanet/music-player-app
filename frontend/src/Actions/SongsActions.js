export const GET_SONGS_SUCCESS = 'GET_SONGS_SUCCESS';
export const GET_SONGS_FAILURE = 'GET_SONGS_FAILURE';
export const GET_SONGS_FETCH = 'GET_SONGS_FETCH';

export const getSongsSuccess = (songs) => ({
    type: GET_SONGS_SUCCESS,
    payload: songs
});
export const getSongsFetch = () => ({
    type: GET_SONGS_FETCH,
});
export const getSongsFailure = (error) => ({
    type: GET_SONGS_FAILURE,
    payload: error,
});