import { Dispatch } from 'redux';
import { createCustomAction } from 'typesafe-actions';
import { SET_CONNECTION_STATE } from './constants';
import { ConnectionStatus } from './enums';

const refreshConnectionStatus = () => async (dispatch: Dispatch): Promise<void> => {
  dispatch(configActions.setConnectionState(ConnectionStatus.ACCOUNT_NOT_LINKED));
};

export const configActions = {
  setTwitchExtContext: createCustomAction('SET_TWITCH_EXT_CONTEXT', type => {
    return (context: Partial<TwitchExtContext>) => ({type, context});
  }),
  setConnectionState: createCustomAction(SET_CONNECTION_STATE, type => {
    return (state: ConnectionStatus) => ({ type, status: state });
  }),
  setTwitchExtAuthorized: createCustomAction('SET_TWITCH_EXT_AUTHORIZATION', type => {
    return (authorized: TwitchExtAuthorized) => ({ type, authorized: authorized });
  }),
  refreshConnectionStatus,
};

export default configActions;
