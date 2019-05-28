import * as Types from 'Types';
import { connect } from 'react-redux';
import CardTileComponent from './CardTileComponent';

const mapStateToProps = (state: Types.RootState) => ({
  width: state.config.appearance.decklist.width,
  cardTileHeight: state.config.appearance.decklist.tileHeight,
});

export type Props = ReturnType<typeof mapStateToProps>;

const CardTile = connect(
  mapStateToProps,
  {}
)(CardTileComponent);

export default CardTile;


