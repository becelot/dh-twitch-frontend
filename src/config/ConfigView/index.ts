import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { setConnectionState } from '../actions';
import ConfigViewComponent from './ConfigViewComponent';

import Types from 'Types';


const mapStateToProps = (state: Types.RootState) => ({
  hasInitialized: state.config.hasInitialized,
  connection: state.config.connection,
});


const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    setConnectionState,
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
