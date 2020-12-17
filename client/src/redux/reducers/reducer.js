import {combineReducers} from 'redux';
import sessionReducer from './sessionReducer';
import profileReducer from './profileReducer';

const reducer = combineReducers({session: sessionReducer, profile: profileReducer});

export default reducer;