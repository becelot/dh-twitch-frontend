import * as React from 'react';

import * as styles from './CardTile.scss';

export interface ICardTile {
  count: number;
  id: string;
  name: string;
}

export class CardTile extends React.Component<ICardTile> {
  public render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.countBadge}>
          <div className={styles.number}>
            {this.props.count}
          </div>
        </div>
        <div className={styles.cardName}>
          {this.props.name}
        </div>
      </div>
    );
  }
}
