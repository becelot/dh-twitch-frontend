import { combineReducers } from 'redux';
import configReducer from './config/reducer';
import hearthstoneReducer from './hearthstone/reducers';


const rootReducer = combineReducers({
  config: configReducer,
  hearthstone: hearthstoneReducer,
});

export default rootReducer;
