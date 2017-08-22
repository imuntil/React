import React from 'react';
import ReactDOM from 'react-dom';
import App, { global } from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
const store = createStore(global)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
