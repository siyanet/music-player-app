import { GET_SONGS_FAILURE, GET_SONGS_SUCCESS } from "../Actions/SongsActions";
const initialState = {
    songs: [],
    error: null,
};
const songsReducer = (state = initialState,action) => {
    switch(action.type){
        case GET_SONGS_SUCCESS:
            return {...state, songs: action.payload};
        case GET_SONGS_FAILURE:
            return {...state, error: action.payload};
        default:
            return state;

    }

}
export default songsReducer;