import * as React from 'react';
import { ReactElement } from 'react';
import { ConnectionStatus } from '../../model/config/enums';

import * as styles from './ConfigView.scss';
import { Props } from './index';

export default class ConfigViewComponent extends React.Component<Props> {
  public componentDidMount(): void {
    /*
    window.Twitch.ext.onContext((context: Partial<TwitchExtContext>) => {
      this.props.setTwitchExtContext(context);
    });

    window.Twitch.ext.onAuthorized((auth: TwitchExtAuthorized) => {
      this.props.setTwitchExtAuthorized(auth);
      if (!this.props.hasInitialized) {
        this.props.requestConnectionState();
      }
    });*/
  }

  public render() {
    const createLayout = (children: ReactElement) => {
      return (
        <div className={styles.wrapper}>
          <p>Hearthstone Deck History extension configuration</p>
          {children}
        </div>
      );
    };
    if (!this.props.hasInitialized) {
      if (this.props.working) {
        return (
          createLayout(
            <>
              <p>Loading Setup</p>
              <p>This might take a few moments.</p>
            </>)
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

    switch (this.props.connection) {
      case ConnectionStatus.READY:
        return createLayout(<p>Twitch is linked to your account.</p>);
      case ConnectionStatus.ACCOUNT_NOT_LINKED:
        return createLayout(
          <>
            <p>Account is currently not linked!</p>
            <p>Make sure to install the extension, register an Account with Deck History and
              link your Twitch account to the plugin</p>
          </>);
      default:
        return createLayout(
          <>
            <p>Unable to reach extension backend service</p>
            <p>
              Please check your browser extensions, or try again later.
            </p>
          </>);
    }
  }
}
