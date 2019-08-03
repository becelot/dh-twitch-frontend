import { Props } from './index';
import React from 'react';
import { ConnectionStatus } from '../../model/config/enums';
import CardLoader from '../../utils/CardLoader';
import Overlay from '../Overlay';


export default class extends React.Component<Props> {

  public componentDidMount(): void {
    window.Twitch.ext.onContext((context: Partial<TwitchExtContext>) => {
      this.props.setTwitchExtContext(context);
    });

    window.Twitch.ext.onAuthorized((auth: TwitchExtAuthorized) => {
      this.props.setTwitchExtAuthorized(auth);
      if (!this.props.hasInitialized) {
        this.props.requestConnectionState().then(status => {
          if (status !== ConnectionStatus.READY) {
            this.retryConnection(20000);
          }
        });
      }
    });
  }

  public render() {
    return (
      <>
        {this.props.ready ? <CardLoader><Overlay /> </CardLoader> : <></>}
      </>
    );
  }

  private retryConnection = (timeout: number) => {
    const retry = () => this.props.requestConnectionState()
      .then(status => {
        if (status === ConnectionStatus.ERROR) {
          window.Twitch.ext.rig.log('Connection aborted, retrying in one minute');
          this.retryConnection(60000);
        } else if (status === ConnectionStatus.ACCOUNT_NOT_LINKED) {
          window.Twitch.ext.rig.log('Account not linked, retrying in ten minute');
          this.retryConnection(600000);
        }
      });

    setTimeout(retry, timeout);
  };
}
