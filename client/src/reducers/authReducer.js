import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
    // ^^ it's important to initialize state as null
    switch(action.type) {
        case FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
} 