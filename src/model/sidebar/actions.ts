import { createAction } from 'typesafe-actions';

export const sidebarActions = {
  toggleSidebar: createAction('TOGGLE_SIDEBAR'),
  setVisible: createAction('SET_SIDEBAR_VISIBLE', action => (visible: boolean) => action(visible)),
};
