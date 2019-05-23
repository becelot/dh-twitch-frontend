import * as React from 'react';
import { ConnectionStatus } from '../enums';

import * as styles from './ConfigView.scss';
import { Props } from './index';

export default class ConfigViewComponent extends React.Component<Props> {
  public componentDidMount(): void {
    window.Twitch.ext.onContext((context: Partial<TwitchExtContext>) => {
      this.props.setTwitchExtContext(context);
    });

    window.Twitch.ext.onAuthorized((auth: TwitchExtAuthorized) => {
      this.props.setTwitchExtAuthorized(auth);
      if (!this.props.hasInitialized) {
        this.props.requestConnectionState();
      }
    });
  }

  public render() {
    if (!this.props.hasInitialized) {
      if (this.props.working) {
        return (
          <div className={styles.wrapper}>
            <p>Loading setup…</p>
            <p>This might take a few moments.</p>
          </div>
        );
      }

      return (
        <div className={styles.wrapper}>
          <p>Unable to reach extension backend service</p>
          <p>
            Please check your browser extensions, or try again later.
          </p>
        </div>
      );
    }

    return (
      <div className={styles.wrapper}>
        {this.props.connection === ConnectionStatus.READY ? (
          <p>Account was linked</p>
        ) : (
          <p>Account is currently not linked</p>
        )}
      </div>
    );
  }
}
