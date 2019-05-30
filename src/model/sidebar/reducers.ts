import { combineReducers } from 'redux';
import { createReducer, getType } from 'typesafe-actions';
import { sidebarActions } from './actions';
import { initialSidebarState } from './state';

const toggleReducer = createReducer(initialSidebarState.expanded)
  .handleAction(
    getType(sidebarActions.toggleSidebar),
    (state, action) => !state
  );

const visibilityReducer = createReducer(initialSidebarState.visible)
  .handleAction(
    getType(sidebarActions.setVisible),
    (state, action) => action.payload,
  );

export default combineReducers({
  expanded: toggleReducer,
  visible: visibilityReducer,
});
