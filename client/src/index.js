import 'materialize-css/dist/css/materialize.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
// ^^ this automatically pulls in index.js from /reducers, allowing access to combineReducers object
// import axios from 'axios';
// window.axios = axios;
// ^^ the two lines above allow us to make API calls from the console using the attached cookies for authentication.

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    // ^^ this is the glue to the redux store
    document.querySelector('#root')
    // ^^ this takes the App component, and renders it to the div with an id of "root" inside
    // the public/index.html file
);
