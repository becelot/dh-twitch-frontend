import * as React from 'react';
import { Props } from './index';

import * as styles from './ConfigView.scss';

export default class ConfigViewComponent extends React.Component<Props> {
  public componentDidMount(): void {
    window.Twitch.ext.onContext((context: Partial<TwitchExtContext>) => {
      this.props.setTwitchExtContext(context);
    });

    window.Twitch.ext.onAuthorized((auth: TwitchExtAuthorized) => {
      this.props.setTwitchExtAuthorized(auth);
      window.Twitch.ext.rig.log(this.props.hasInitialized ? 'true' : 'false');
      if (!this.props.hasInitialized) {
        window.Twitch.ext.rig.log('Requesting connection state async');
        this.props.requestConnectionState();
        window.Twitch.ext.rig.log('Requesting connection state async');
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
        <p>Something was returned</p>
      </div>
    );
  }
}
