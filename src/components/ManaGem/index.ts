import * as Types from 'Types';
import { connect } from 'react-redux';
import ManaGemComponent from './ManaGem';

const mapStateToProps = (state: Types.RootState) => ({
  width: state.config.appearance.decklist.width,
  cardTileHeight: state.config.appearance.decklist.tileHeight,
});

export type Props = ReturnType<typeof mapStateToProps>;

const ManaGem = connect(
  mapStateToProps,
  {}
)(ManaGemComponent);

export default ManaGem;


