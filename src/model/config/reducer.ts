import { createReducer, getType } from 'typesafe-actions';
import { configActions } from './actions';
import { configInitialState } from './state';
import twitchReducer from './twitch/reducer';
import { combineReducers } from 'redux';

const config = createReducer(configInitialState.state)
  .handleAction(
    getType(configActions.setConnectionState),
    (state, action) => ({...state, connection: action.status, hasInitialized: true})
  );

export default combineReducers({
  state: config,
  twitch: twitchReducer,
  appearance: createReducer(configInitialState.appearance),
});
