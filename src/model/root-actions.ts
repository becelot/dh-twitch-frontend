import { configActions } from './config/actions';
import hearthstoneActions from './hearthstone/actions';

export default {
  ...configActions,
  ...hearthstoneActions,
};
