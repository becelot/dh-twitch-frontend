import { createReducer, getType } from 'typesafe-actions';
import overlayActions from './actions';
import { initialOverlayState, OverlayState } from './state';

export default createReducer(initialOverlayState)
  .handleAction(
    getType(overlayActions.nextDeck),
    (state, action) => {
      if (state.currentDeckIndex + 1 < state.recentDecks.length) {
        return {
          ...state,
          currentDeckIndex: state.currentDeckIndex + 1,
          hasNext: state.currentDeckIndex + 2 < state.recentDecks.length,
          hasPrevious: true,
        };
      }

      return state;
    }
  )
  .handleAction(
    getType(overlayActions.previousDeck),
    (state, action) => {
      if (state.currentDeckIndex > 0) {
        return {
          ...state,
          currentDeckIndex: state.currentDeckIndex - 1,
          hasPrevious: state.currentDeckIndex > 1,
          hasNext: true,
        };
      }

      return state;
    }
  )
  .handleAction(
    getType(overlayActions.fetchRecent.request),
    (state, action) => ({...state, status: OverlayState.REQUEST_PENDING})
  )
  .handleAction(
    getType(overlayActions.fetchRecent.success),
    (state, action) => ({...state, status: OverlayState.IDLE, recentDecks: action.payload, currentDeckIndex: 0, hasPrevious: false, hasNext: action.payload.length > 1})
  )
  .handleAction(
    getType(overlayActions.fetchRecent.failure),
    (state, action) => ({...state, status: OverlayState.REQUEST_ERROR, error: action.payload})
  );
