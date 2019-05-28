import { createReducer, getType } from 'typesafe-actions';
import { HearthstoneDbState, initialHsState } from './state';
import hearthstoneActions from './actions';


const hearthstoneReducer = createReducer(initialHsState)
  .handleAction(
    getType(hearthstoneActions.fetchDatabase.request),
    (state, action) => ({...state, status: HearthstoneDbState.PENDING})
  )
  .handleAction(
    getType(hearthstoneActions.fetchDatabase.failure),
    (state, action) => ({...state, status: HearthstoneDbState.ERROR, error: action.payload})
  )
  .handleAction(
    getType(hearthstoneActions.fetchDatabase.success),
    (state, action) => ({...state, status: HearthstoneDbState.LOADED, cards: action.payload})
  );

export default hearthstoneReducer;
