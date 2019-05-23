import { action, createCustomAction } from 'typesafe-actions';
import { IS_INITIALIZED, SET_CONNECTION_STATE } from './constants';
import { ConnectionStatus } from './enums';

export const setConnectionState = createCustomAction(SET_CONNECTION_STATE, type => {
  return (state: ConnectionStatus) => ({ type, status: state });
});
export const setIsInitialized = (filter: boolean) => action(IS_INITIALIZED, filter);

export const actionCreators = {

};
