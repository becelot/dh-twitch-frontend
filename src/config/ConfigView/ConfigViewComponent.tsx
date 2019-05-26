import * as React from 'react';
import { ReactElement } from 'react';
import { ConnectionStatus } from '../../model/config/enums';

import * as styles from './ConfigView.scss';
import { Props } from './index';
import { CardTile } from '../../components/Card/CardTile';
import { DeckList } from '../../components/Deck/DeckList';

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
          <DeckList deckList={[{id: '1', name: 'Curious Glimmerroot', count: 1}, {id: '2', name: 'Curious Glimmerroot', count: 3}, {id: '3', name: 'Curious Glimmerroot', count: 2}, {id: '4', name: 'Curious Glimmerroot', count: 2}, {id: '5', name: 'Curious Glimmerroot', count: 2}, {id: '6', name: 'Curious Glimmerroot', count: 2}, {id: '7', name: 'Curious Glimmerroot', count: 2},{id: '8', name: 'Curious Glimmerroot', count: 2},{id: '9', name: 'Curious Glimmerroot', count: 2},{id: '10', name: 'Curious Glimmerroot', count: 2},{id: '11', name: 'Curious Glimmerroot', count: 2},{id: '12', name: 'Curious Glimmerroot', count: 2},{id: '13', name: 'Curious Glimmerroot', count: 2},{id: '14', name: 'Curious Glimmerroot', count: 2},{id: '15', name: 'Curious Glimmerroot', count: 2}]} deckName={'Tst'} />
          {/*<p>Hearthstone Deck History extension configuration</p>*/}
          {/*{children}*/}
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
