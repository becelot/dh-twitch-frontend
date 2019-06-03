import { Dispatch } from 'redux';
import * as Types from 'Types';
import { createCustomAction } from 'typesafe-actions';
import { API_ENDPOINT } from '../../constants';
import { SET_CONNECTION_STATE } from './constants';
import { ConnectionStatus } from './enums';
import twitchActions from './twitch/actions';

const refreshConnectionStatus = () => async (dispatch: Dispatch, getState: () => Types.RootState): Promise<ConnectionStatus> => {

  const dispatchReturn = (status: ConnectionStatus): ConnectionStatus => {
    dispatch(configActions.setConnectionState(status));
    return status;
  };

  const state: Types.RootState = getState();
  if (!state.config.twitch.authorized) {
    return dispatchReturn(ConnectionStatus.NOT_CONFIGURED);
  }

  try {
    const response = await fetch(
      `${API_ENDPOINT}/user/${state.config.twitch.authorized.channelId}/configured`,
      {
        headers: {
          Accept: 'application/json',
        },
        method: 'GET',
        mode: 'cors',
    });

    if (response.status !== 200) {
      return dispatchReturn(ConnectionStatus.ERROR);
    }

    const status: {status: number; message: string} = await response.json();
    if (status.status === 200) {
      return dispatchReturn(ConnectionStatus.READY);
    } else if (status.status === 402) {
      return dispatchReturn(ConnectionStatus.ACCOUNT_NOT_LINKED);
    } else {
      return dispatchReturn(ConnectionStatus.ERROR);
    }
  } catch (e) {
    return dispatchReturn(ConnectionStatus.ERROR);
  }
};



export const configActions = {
  setConnectionState: createCustomAction(SET_CONNECTION_STATE, type => {
    return (state: ConnectionStatus) => ({ type, status: state });
  }),
  ...twitchActions,
};

export const configThunks = {
  refreshConnectionStatus,
};
