import { createReducer, getType } from 'typesafe-actions';
import { initialTwitchState } from './state';
import actions from './actions';
import { combineReducers } from 'redux';

const context = createReducer(initialTwitchState.context)
  .handleAction(
    getType(actions.setTwitchExtContext),
    (state, action) => action.context
  );

const authorized = createReducer(initialTwitchState.authorized)
  .handleAction(
    getType(actions.setTwitchExtAuthorized),
    (state, action) => action.authorized
  );


export default combineReducers({
  context,
  authorized,
});
