import { combineReducers }  from 'redux';
import songsReducer from './SongsReducer';
import updateSongsReducer from './UpdateSongReducer';
import { createSongReducer } from './CreateSongReducer';
import { deleteSongReducer } from './deleteSongReducer';
import { userRegisterReducer } from './userRegisterReducer';
import { loginReducer } from './loginReducer';
import logoutReducer from './LogoutReducer';

export const rootReducer = combineReducers({
    songsReducer: songsReducer,
    updateSongsReducer: updateSongsReducer,
    createSongReducer: createSongReducer,
    deleteSongReducer: deleteSongReducer,
    userRegisterReducer: userRegisterReducer,
    loginReducer: loginReducer,
    logoutReducer: logoutReducer,
})