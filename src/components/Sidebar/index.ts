import * as Types from 'Types';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import SidebarComponent from './SidebarComponent';


const mapStateToProps = (state: Types.RootState) => ({
  side: 'left',
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
    },
    dispatch);

export type Props = ReturnType<typeof mapStateToProps>
  & ReturnType<typeof mapDispatchToProps>;

const Sidebar = connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarComponent);

export default Sidebar;
