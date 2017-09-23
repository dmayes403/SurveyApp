import axios from 'axios';
import { FETCH_USER } from './types';

const fetchUser = () => {
    return function(dispatch) {
        // if fetchUser is calling a function, redux-thunk will *automatically*
        // pass in *dispatch* as an argument
        axios
            .get('/api/current_user')
            .then(res => dispatch({ type: FETCH_USER, payload: res }));
    };
};