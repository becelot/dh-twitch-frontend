import { createReducer, getType } from 'typesafe-actions';
import { initialTwitchState } from './state';
import actions from './actions';

const context = createReducer(initialTwitchState)
  .handleAction(
    getType(actions.setTwitchExtContext),
    (state, action) =>
      Object.assign({}, state, {context: action.context})
  );

const authorized = createReducer(initialTwitchState)
  .handleAction(
    getType(actions.setTwitchExtAuthorized),
    (state, action) =>
      Object.assign({}, state, {authorized: action.authorized})
  );


export default createReducer(initialTwitchState, {
  ...context.handlers,
  ...authorized.handlers,
});
