import { combineReducers } from 'redux';
import { fetchAuth } from './auth-reducer.jsx';
import { fetchMuseums } from './museum-reducer.jsx';

const rootReducer = combineReducers({
    authStore: fetchAuth,
    museumStore: fetchMuseums,
});

export default rootReducer;