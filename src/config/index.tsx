import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../store';
import ConfigView from './ConfigView';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <ConfigView />
  </Provider>,
  rootElement);
