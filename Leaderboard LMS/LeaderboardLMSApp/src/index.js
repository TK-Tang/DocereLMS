import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';

window.Alert = require('react-s-alert').default;
var Alert = require('react-s-alert').default;

ReactDOM.render(
    <div>
        <Alert stack={true}/>
        <Root />
    </div>
    , 
    document.getElementById('root')
);

registerServiceWorker();
