import { combineReducers } from 'redux';

import searchReducer from './searchReducer';
import messageReducer from './messageReducer';
import userReducer from './userReducer';

export default combineReducers({
    search: searchReducer,
    message: messageReducer,
    users: userReducer
});