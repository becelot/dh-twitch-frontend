import * as React from 'react';
import { Props } from './index';

import * as styles from './ConfigView.scss';

export default class ConfigViewComponent extends React.Component<Props> {
  public componentDidMount(): void {
    window.Twitch.ext.onContext((context: Partial<TwitchExtContext>) => {});
  }

  public render() {

    return (
      <div className={styles.wrapper}>
        <p>Loading setup…</p>
        <p>This might take a few moments.</p>
      </div>
    );
  }
}
