import { combineReducers } from 'redux';
import { createReducer, getType } from 'typesafe-actions';
import { configActions } from './actions';
import { ConfigState, initialState } from './state';

const connection = createReducer(initialState.connection)
  .handleAction(getType(configActions.setConnectionState), (state, action) => action.status);
const hasInitialized = createReducer(initialState.hasInitialized)
  .handleAction(getType(configActions.setConnectionState), () => true);
const completingSetup = createReducer(initialState.completingSetup)
  .handleAction(getType(configActions.setConnectionState), () => false);

const twitchContext = createReducer(initialState.twitch.context)
  .handleAction(getType(configActions.setTwitchExtContext), (state, action) => action.context);

const twitchAuthorization = createReducer(initialState.twitch.authorized)
  .handleAction(getType(configActions.setTwitchExtAuthorized), (state, action) => action.authorized);

const twitch = combineReducers({
  context: twitchContext,
  authorized: twitchAuthorization,
});

export default combineReducers<ConfigState>({
  connection,
  hasInitialized,
  completingSetup,
  twitch,
});
