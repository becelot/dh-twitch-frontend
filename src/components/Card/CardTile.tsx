import * as React from 'react';

import * as styles from './CardTile.scss';

export interface ICardTile {
  count: number;
  id: string;
  name: string;
}

export class StyledHexagon extends React.Component {
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

export class CardTile extends React.Component<ICardTile> {
  public render() {
    return (
      <div className={styles.wrapper}>
        <StyledHexagon >{this.props.count}</StyledHexagon>
        <div className={styles.cardName}>
          {this.props.name}
        </div>
        <div className={styles.countBadge}>
          {this.props.count}
        </div>
      </div>
    );
  }
}
