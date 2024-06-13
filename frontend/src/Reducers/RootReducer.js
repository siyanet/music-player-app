import { combineReducers }  from 'redux';
import songsReducer from './SongsReducer';

export const rootReducer = combineReducers({songsReducer: songsReducer})