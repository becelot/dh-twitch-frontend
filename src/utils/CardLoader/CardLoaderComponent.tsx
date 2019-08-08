import React from 'react';
import { Props } from './index';


export default class extends React.Component<Props> {

  public componentDidMount(): void {
    this.props.fetchHearthstoneDatabase();
  }

  public render() {
    return this.props.loaded && this.props.children ? this.props.children : <div>Loading card data...</div>;
  }
}
