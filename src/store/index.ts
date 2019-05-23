import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from './root-reducer';
import { RootAction, RootState } from 'Types';


export const epicMiddleware = applyMiddleware(
  createEpicMiddleware<RootAction,
    RootAction,
    RootState>(),
);

const store = createStore(rootReducer, {}, epicMiddleware);

export default store;
