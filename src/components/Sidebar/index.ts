import * as Types from 'Types';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { sidebarActions } from '../../model/sidebar/actions';
import SidebarComponent from './SidebarComponent';


const mapStateToProps = (state: Types.RootState) => ({
  side: 'left',
  width: state.config.appearance.overlay.width,
  expanded: state.sidebar.expanded,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      toggleSidebar: sidebarActions.toggleSidebar,
      setVisibility: sidebarActions.setVisible,
    },
    dispatch);

export type Props = ReturnType<typeof mapStateToProps>
  & ReturnType<typeof mapDispatchToProps>;

const Sidebar = connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarComponent);

export default Sidebar;
