import { Dispatch } from 'redux';
import * as Types from 'Types';
import { createAction, createAsyncAction } from 'typesafe-actions';
import { API_ENDPOINT } from '../../constants';
import { IRootDeck } from './state';


const fetchRecentDecks = () => async (dispatch: Dispatch, getState: () => Types.RootState): Promise<void> => {
  dispatch(overlayActions.fetchRecent.request());
  const state: Types.RootState = getState();

  if (!state.config.twitch.authorized || !state.config.twitch.authorized.channelId) {
    dispatch(overlayActions.fetchRecent.failure('Could not determine channel id. Is Twitch not initialized?'));
    return;
  }

  try {
    const response = await fetch(
      `${API_ENDPOINT}/user/${state.config.twitch.authorized.channelId}/recent`,
      {
        headers: {
          Accept: 'application/json',
        },
        method: 'GET',
        mode: 'cors',
      });

    if (response.status !== 200) {
      dispatch(overlayActions.fetchRecent.failure('Server error. Please try again later.'));
      return;
    }

    const status: {status: number; message: string; decks: IRootDeck[]} = await response.json();
    if (status.status === 200) {
      dispatch(overlayActions.fetchRecent.success(status.decks));
      return;
    }  else {
      dispatch(overlayActions.fetchRecent.failure(status.message));
      return;
    }
  } catch (e) {
    dispatch(overlayActions.fetchRecent.failure('Could not reach Deck History server. Please try again later.'));
    return;
  }
};

const overlayActions = {
  nextDeck: createAction('OVERLAY_NEXT_DECK'),
  previousDeck: createAction('OVERLAY_PREVIOUS_DECK'),
  fetchRecent: createAsyncAction(
    'FETCH_RECENT_DECKS_REQUEST',
    'FETCH_RECENT_DECKS_SUCCESS',
    'FETCH_RECENT_DECKS_FAILURE',
  )<undefined, IRootDeck[], string>(),
};

export default overlayActions;

export const overlayThunks = {
  fetchRecentDecks,
};
