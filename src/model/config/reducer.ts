import { createReducer, getType } from 'typesafe-actions';
import { configActions } from './actions';
import { configInitialState } from './state';
import twitchReducer from './twitch/reducer';

const config = createReducer(configInitialState)
  .handleAction(getType(configActions.setConnectionState),
    (state, action) => Object.assign({}, state, {
      connection: action.status,
      hasInitialized: true,
      completingSetup: false
    }));

export default createReducer(configInitialState, {
  ...config.handlers,
  ...twitchReducer.handlers,
});
