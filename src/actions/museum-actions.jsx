import axios from "axios";

export const FETCH_MUSEUMS = 'FETCH_MUSEUMS'
// export const VIEW_MUSEUM = 'VIEW_MUSEUM'
export const RECEIVE_MUSEUMS = 'RECEIVE_MUSEUMS'

export function fetchMuseums(){
    return (dispatch, getState) => {
        dispatch({type: FETCH_MUSEUMS});
        axios.post('http://museumadv.azurewebsites.net/museum/list', {
            
        })
        .then((response) => {
            dispatch( {
                type: RECEIVE_MUSEUMS,
                payload: response.data
            })
        })
    }
}