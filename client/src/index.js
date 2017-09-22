import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App';

const store = createStore(() => [], {}, applyMiddleware());

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    // ^^ this is the glue to the redux store
    document.querySelector('#root')
    // ^^ this takes the App component, and renders it to the div with an id of "root" inside
    // the public/index.html file
);
