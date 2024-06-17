export const Update_SONG_SUCCESS = 'Update_SONG_SUCCESS';
export const Update_SONG_FAILURE = 'Update_SONG_FAILURE';
export const Update_SONG = 'Update_SONG_FETCH';

export const updateSongSuccess = (song) => ({
    type: Update_SONG_SUCCESS,
    payload: song
});
export const updateSong = (songId,updateData) => ({
    type: Update_SONG,
    payload: {songId,updateData},
});
export const UpdateSongFailure = (error) => ({
    type: Update_SONG_FAILURE,
    payload: error,
});