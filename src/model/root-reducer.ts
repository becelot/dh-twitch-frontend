import { combineReducers } from 'redux';
import configReducer from './config/reducer';


const rootReducer = combineReducers({
  config: configReducer,
});

export default rootReducer;
