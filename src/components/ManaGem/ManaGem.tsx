import * as React from 'react';
import * as styles from './ManaGem.scss';

export class ManaGem extends React.Component {
  public render() {
    return (
      <div className={styles.hexagon}>
        <div className={styles.costText}>
          {this.props.children}
        </div>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />

      </div>
    );
  }
}
