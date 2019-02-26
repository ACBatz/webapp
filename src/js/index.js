import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Globe from './components/Globe';

import * as serviceWorker from './serviceWorker';

import "cesium/Source/Widgets/widgets.css";
import buildModelUrl from "cesium/Source/Core/buildModuleUrl";
buildModelUrl.setBaseUrl('./static/cesium');

ReactDOM.render(<Globe/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
