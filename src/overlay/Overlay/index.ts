import * as Types from 'Types';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import overlayActions, { overlayThunks } from '../../model/overlay/actions';
import { IRootDeck, OverlayState } from '../../model/overlay/state';
import OverlayComponent from './OverlayComponent';


const mapIndexToLabel = (decks: ReadonlyArray<IRootDeck>, index: number) => {
  if (decks.length === 0) {
    return 'no decks';
  }

  switch (index) {
    case 0: return 'current deck';
    case 1: return 'previous deck';
    case 2: return 'third deck';
    case 3: return 'fourth deck';
    case 4: return 'fifth deck';
    default: return `deck ${index.toString()}`;
  }
};

const mapStateToProps = (state: Types.RootState) => ({
  hasNext: state.overlay.hasNext,
  hasPrevious: state.overlay.hasPrevious,
  currentDeckLabel: mapIndexToLabel(state.overlay.recentDecks, state.overlay.currentDeckIndex),
  working: state.overlay.status,
  error: state.overlay.error,
  recentDecks: state.overlay.recentDecks,
  index: state.overlay.currentDeckIndex,
  expanded: state.sidebar.expanded,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    fetchRecent: overlayThunks.fetchRecentDecks,
    nextDeck: overlayActions.nextDeck,
    previousDeck: overlayActions.previousDeck,
  }, dispatch);


export type Props = ReturnType<typeof mapStateToProps>
  & ReturnType<typeof mapDispatchToProps>;

const Overlay = connect(
  mapStateToProps,
  mapDispatchToProps
)(OverlayComponent);

export default Overlay;
