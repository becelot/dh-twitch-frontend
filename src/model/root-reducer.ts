import { combineReducers } from 'redux';
import configReducer from './config/reducer';
import hearthstoneReducer from './hearthstone/reducers';
import sidebarReducers from './sidebar/reducers';


const rootReducer = combineReducers({
  config: configReducer,
  hearthstone: hearthstoneReducer,
  sidebar: sidebarReducers,
});

export default rootReducer;
