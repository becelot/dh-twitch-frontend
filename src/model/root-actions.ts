import { configActions } from './config/actions';
import hearthstoneActions from './hearthstone/actions';
import { sidebarActions } from './sidebar/actions';

export default {
  ...configActions,
  ...hearthstoneActions,
  ...sidebarActions
};
