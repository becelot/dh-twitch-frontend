import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import Types from 'Types';
import { configActions, configThunks } from '../../model/config/actions';
import { ConnectionStatus } from '../../model/config/enums';
import ConfigViewComponent from './ConfigViewComponent';

const mapStateToProps = (state: Types.RootState) => ({
  hasInitialized: state.config.state.hasInitialized,
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

const ConfigView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfigViewComponent);

export default ConfigView;
