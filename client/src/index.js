import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

ReactDOM.render(
    <App />, document.querySelector('#root')
    // ^^ this takes the App component, and renders it to the div with an id of "root" inside
    // the public/index.html file
);
