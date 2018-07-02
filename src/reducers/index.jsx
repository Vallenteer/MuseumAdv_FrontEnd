import { combineReducers } from 'redux';
import { fetchAuth } from './auth-reducer.jsx';
import { fetchMuseums } from './museum-reducer.jsx';
import { fetchQuizzes } from './quiz-reducer.jsx';

const rootReducer = combineReducers({
    authStore: fetchAuth,
    museumStore: fetchMuseums,
    quizStore: fetchQuizzes
});

export default rootReducer;