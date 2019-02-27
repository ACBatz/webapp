import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";
import { store } from './store';
import './index.css';
import Globe from './components/Globe';

import * as serviceWorker from './serviceWorker';

import "cesium/Source/Widgets/widgets.css";
import buildModelUrl from "cesium/Source/Core/buildModuleUrl";
buildModelUrl.setBaseUrl('./static/cesium');

render(
	<Provider store={store}>
		<Globe />
	</Provider>,
	document.getElementById("root")
);

serviceWorker.unregister();
