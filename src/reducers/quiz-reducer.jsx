import { FETCH_QUIZZES, RECEIVE_QUIZZES } from '../actions/quiz-actions.jsx'

const defaultQuizState = {
     QuizzesData: []    
}

export function fetchQuizzes(state = defaultQuizState, action){
    switch (action.type) {
        case FETCH_QUIZZES:
            return ({QuizzesData: null, inProgress: true})
        case RECEIVE_QUIZZES:
            return Object.assign({}, state, {QuizzesData: action.payload, inProgress: false})

        default:
            return state
    }
}