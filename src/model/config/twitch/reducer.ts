import { createReducer, getType } from 'typesafe-actions';
import { initialTwitchState } from './state';
import actions from './actions';
import { combineReducers } from 'redux';

const context = createReducer(initialTwitchState.context)
  .handleAction(
    getType(actions.setTwitchExtContext),
    (state, action) =>
      Object.assign({}, state, {context: action.context})
  );

const authorized = createReducer(initialTwitchState.authorized)
  .handleAction(
    getType(actions.setTwitchExtAuthorized),
    (state, action) =>
      Object.assign({}, state, {authorized: action.authorized})
  );


export default combineReducers({
  context,
  authorized,
});
