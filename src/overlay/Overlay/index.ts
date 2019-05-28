import * as Types from 'Types';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import OverlayComponent from './OverlayComponent';

const mapStateToProps = (state: Types.RootState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

const Overlay = connect(
  mapStateToProps,
  mapDispatchToProps
)(OverlayComponent)

export default Overlay;
