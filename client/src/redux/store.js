import {createStore} from 'redux';
import initialState from './initialState';
import reducer from './reducers/reducer';

const store = createStore(reducer, initialState);

export default store;