import * as Types from 'Types';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import RootComponent from './RootComponent';
import { configActions, configThunks } from '../../model/config/actions';
import { ConnectionStatus } from '../../model/config/enums';

const mapStateToProps = (state: Types.RootState) => ({
  hasInitialized: state.config.state.hasInitialized,
  ready: state.config.state.hasInitialized && state.config.state.connection === ConnectionStatus.READY,
  connection: state.config.state.connection,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
      setTwitchExtContext: configActions.setTwitchExtContext,
      setTwitchExtAuthorized: configActions.setTwitchExtAuthorized,
      requestConnectionState: configThunks.refreshConnectionStatus,
    },
    dispatch
  );

export type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const Root = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootComponent);

export default Root;
