import { combineReducers } from 'redux';
import configReducer from './config/reducer';
import hearthstoneReducer from './hearthstone/reducers';
import sidebarReducers from './sidebar/reducers';
import overlayReducers from './overlay/reducers';


const rootReducer = combineReducers({
  config: configReducer,
  hearthstone: hearthstoneReducer,
  sidebar: sidebarReducers,
  overlay: overlayReducers,
});

export default rootReducer;
