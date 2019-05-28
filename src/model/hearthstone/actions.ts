import { action, createAsyncAction } from 'typesafe-actions';
import { Dispatch } from 'redux';
import * as Types from 'Types';
import { HearthDB, HearthstoneDbState } from './state';
import HearthstoneJSON, { CardData } from 'hearthstonejson-client';


const fetchHearthstoneDatabase = () => async (dispatch: Dispatch, getState: () => Types.RootState): Promise<HearthstoneDbState> => {
  dispatch(hearthstoneActions.fetchDatabase.request());
  const state: Types.RootState = getState();

  try {
    const cards: CardData[] = await new HearthstoneJSON().getLatest(state.config.state.locale);

    const cardDb: HearthDB = {};
    cards.forEach((card: CardData) => {
      if (card.dbfId) {
        cardDb[card.dbfId] = card;
      }
    });

    dispatch(hearthstoneActions.fetchDatabase.success(cardDb));
    return HearthstoneDbState.LOADED;
  } catch (e) {
    dispatch(hearthstoneActions.fetchDatabase.failure('Could not fetch data from hearthstonejson-client'));
    return HearthstoneDbState.ERROR;
  }
};

const hearthstoneActions = {
  fetchDatabase: createAsyncAction(
    'FETCH_HSDB_REQUEST',
    'FETCH_HSDB_SUCCESS',
    'FETCH_HSDB_ERROR'
    )<undefined, HearthDB, string>(),
};

export default hearthstoneActions;

export const hearthstoneThunks = {
  fetchHearthstoneDatabase,
};
