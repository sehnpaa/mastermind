import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import { createStore, Store } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

const store = createStore(reducer);

const render = () => ReactDOM.render(
  <Provider store={store}>
    <App state={store.getState()} />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

render();
store.subscribe(render);

registerServiceWorker();
