import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import Types from 'Types';
import { configActions, configThunks } from '../actions';
import { ConnectionStatus } from '../enums';
import ConfigViewComponent from './ConfigViewComponent';

const mapStateToProps = (state: Types.RootState) => ({
  hasInitialized: state.config.hasInitialized,
  connection: state.config.connection,
  working: state.config.completingSetup || state.config.connection === ConnectionStatus.UNKNOWN,
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

const ConfigView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfigViewComponent);

export default ConfigView;
