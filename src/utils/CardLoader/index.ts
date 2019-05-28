import * as Types from 'Types';
import { bindActionCreators, Dispatch } from 'redux';
import { hearthstoneThunks } from '../../model/hearthstone/actions';
import CardLoaderComponent from './CardLoaderComponent';
import { connect } from 'react-redux';
import { HearthstoneDbState } from '../../model/hearthstone/state';


const mapStateToProps = (state: Types.RootState) => ({
  locale: state.config.state.locale,
  loaded: state.hearthstone.status === HearthstoneDbState.LOADED,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
      fetchHearthstoneDatabase: hearthstoneThunks.fetchHearthstoneDatabase,
    },
    dispatch);

export type Props = ReturnType<typeof mapStateToProps>
  & ReturnType<typeof mapDispatchToProps> ;

const CardLoader = connect(
  mapStateToProps,
  mapDispatchToProps
)(CardLoaderComponent);

export default CardLoader;
