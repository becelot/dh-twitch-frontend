import { Dispatch } from 'redux';
import * as Types from 'Types';
import { createCustomAction } from 'typesafe-actions';
import { SET_CONNECTION_STATE } from './constants';
import { ConnectionStatus } from './enums';
import twitchActions from './twitch/actions';

const refreshConnectionStatus = () => async (dispatch: Dispatch, getState: () => Types.RootState): Promise<void> => {
  const state: Types.RootState = getState();
  if (!state.config.twitch.authorized) {
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:5000/api/user/configured/${state.config.twitch.authorized.channelId}`
      , {
        headers: {
          Accept: 'application/json',
        },
        method: 'GET',
        mode: 'cors',
    });

    if (response.status !== 200) {
      dispatch(configActions.setConnectionState(ConnectionStatus.ERROR));
      return;
    }

    response.json().then((status: {status: number; message: string}) => {
      if (status.status === 200) {
        dispatch(configActions.setConnectionState(ConnectionStatus.READY));
      } else if (status.status === 402) {
        dispatch(configActions.setConnectionState(ConnectionStatus.ACCOUNT_NOT_LINKED));
      } else {
        dispatch(configActions.setConnectionState(ConnectionStatus.ERROR));
      }
    });
  } catch (e) {
    dispatch(configActions.setConnectionState(ConnectionStatus.ERROR));
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
