import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../model';
import Root from './Root';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  rootElement,
);
