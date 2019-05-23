import { combineReducers } from 'redux';
import { createReducer, getType } from 'typesafe-actions';
import { setConnectionState } from './actions';
import { ConfigState, initialState } from './state';

const connection = createReducer(initialState.connection)
  .handleAction(getType(setConnectionState), (state, action) => action.status);

const hasInitialized = createReducer(initialState.hasInitialized);

export default combineReducers<ConfigState>({
  connection,
  hasInitialized,
});
