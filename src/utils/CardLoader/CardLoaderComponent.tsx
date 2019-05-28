import React from 'react';
import { Props } from './index';


export default class extends React.Component<Props> {

  public componentDidMount(): void {
    console.log('Did mount');
    this.props.fetchHearthstoneDatabase();
  }

  public render() {
    return this.props.loaded && this.props.children ? this.props.children : <div>Hell World</div>;
  }
}
