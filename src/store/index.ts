import { applyMiddleware, compose, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk';
import rootReducer from './root-reducer';
import { RootAction, RootState } from 'Types';


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState
  >();

// configure middlewares
const middlewares = [epicMiddleware, thunk];

// compose enhancers
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

const store = createStore(rootReducer, {}, enhancer);

epicMiddleware.run(combineEpics());

export default store;
