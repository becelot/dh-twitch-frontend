import { connect } from 'react-redux';
import * as Types from 'Types';
import DeckListComponent from './DeckListComponent';

const DeckList = connect(
  (state: Types.RootState) => ({
    db: state.hearthstone.cards,
  }),
)(DeckListComponent);

export default DeckList;
