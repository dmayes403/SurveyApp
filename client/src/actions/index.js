import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
        // if fetchUser is calling a function, redux-thunk will *automatically*
        // pass in *dispatch* as an argument
        const res = await axios.get('/api/current_user');
        dispatch({ type: FETCH_USER, payload: res.data });
    };