import * as React from 'react';
import { Props } from './index';

export default class ConfigViewComponent extends React.Component<Props> {
  public componentDidMount(): void {
  }

  public render() {

    return (
      <div>
        <span>
          {this.props.hasInitialized ? 'hallo' : 'welt'}
        </span>
      </div>
    );
  }
}
