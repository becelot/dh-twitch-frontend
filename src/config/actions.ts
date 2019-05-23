import { Dispatch } from 'redux';
import * as Types from 'Types';
import { createCustomAction } from 'typesafe-actions';
import { SET_CONNECTION_STATE } from './constants';
import { ConnectionStatus } from './enums';

const refreshConnectionStatus = () => async (dispatch: Dispatch, getState: () => Types.RootState): Promise<void> => {
  const state: Types.RootState = getState();
  if (!state.config.twitch.authorized) {
    dispatch(configActions.setConnectionState(ConnectionStatus.ERROR));
    return;
  }

  try {

    window.Twitch.ext.rig.log('Before ');
    const response = await fetch(
      `http://localhost:5000/api/user/configured/${state.config.twitch.authorized.channelId}`
      , {
        headers: {
          Accept: 'application/json',
        },
        method: 'GET',
        mode: 'cors',
    });

    window.Twitch.ext.rig.log(response.status.toString());
    if (response.status !== 200) {
      dispatch(configActions.setConnectionState(ConnectionStatus.ERROR));
      return;
    }

    dispatch(configActions.setConnectionState(ConnectionStatus.READY));
  } catch (e) {
    window.Twitch.ext.rig.log(e.toLocaleString());
    dispatch(configActions.setConnectionState(ConnectionStatus.ERROR));
  }
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
};

export const configThunks = {
  refreshConnectionStatus,
};

export default {configThunks, configActions};
