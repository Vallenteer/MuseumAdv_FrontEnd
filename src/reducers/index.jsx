import { combineReducers } from 'redux';
import { fetchAuth } from './auth-reducer.jsx';

const rootReducer = combineReducers({
    authStore: fetchAuth,
});

export default rootReducer;