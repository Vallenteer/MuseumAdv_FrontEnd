import axios from "axios";

export const FETCH_QUIZZES = 'FETCH_QUIZZES'
// export const VIEW_MUSEUM = 'VIEW_MUSEUM'
export const RECEIVE_QUIZZES = 'RECEIVE_QUIZZES'

export function fetchQuizzes(){
    return (dispatch, getState) => {
        dispatch({type: FETCH_QUIZZES});
        axios.post('http://museumadv.azurewebsites.net/pertanyaan/list', {
            
        })
        .then((response) => {
            dispatch( {
                type: RECEIVE_QUIZZES,
                payload: response.data
            })
        })
    }
}