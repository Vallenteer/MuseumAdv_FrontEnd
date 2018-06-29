import { FETCH_MUSEUMS, RECEIVE_MUSEUMS } from '../actions/museum-actions.jsx'

const defaultMuseumState = {
     MuseumsData: []    
}

export function fetchMuseums(state = defaultMuseumState, action){
    switch (action.type) {
        case FETCH_MUSEUMS:
            return ({MuseumsData: null, inProgress: true})
        case RECEIVE_MUSEUMS:
            return Object.assign({}, state, {MuseumsData: action.payload, inProgress: false})

        default:
            return state
    }
}