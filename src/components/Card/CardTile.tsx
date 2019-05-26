import * as React from 'react';

import * as styles from './CardTile.scss';
import { ManaGem } from '../ManaGem/ManaGem';

export interface ICardTile {
  count: number;
  id: string;
  name: string;
}

interface State {
  hovered: boolean;
}

export class CardTile extends React.Component<ICardTile, State> {
  public ref: HTMLDivElement | null = null;

  public constructor(props: ICardTile) {
    super(props);

    this.state = {hovered: false};
  }

  public onMouseOver = () => {
    this.setState((state) => {
      return {...state, hovered: true};
    });
  };

  public onMouseOut = () => {
    this.setState((state) => {
      return {...state, hovered: false};
    });
  };

  public render() {
    let tooltip = null;
    if (this.ref && this.state.hovered) {
      const rect = this.ref && this.ref.getBoundingClientRect();

      let y = 0;
      let x = 0;
      if (rect) {
        y = rect.bottom - rect.height / 2;
        x = rect.right - rect.width / 2;
      }

      const viewPortHeight = window.innerHeight;

      const vh = viewPortHeight / 100;
      const height = vh * 46.25;

      const elementWidth = rect.width;

      const topMargin = 50;
      const bottomMargin = 40;

      let posTop = 0;
      if (y - height / 2 < topMargin) {
        posTop = topMargin - y;
      } else if (y + height / 2 > viewPortHeight - bottomMargin) {
        posTop = viewPortHeight - bottomMargin - height - y;
      } else {
        posTop = - height / 2;
      }

      tooltip = (
        <div
          style={{
            position: 'absolute',
            height,
            top: posTop,
            left: x + elementWidth / 2,
            overflow: 'hidden',
          }}
        >
          <img
            src={`https://art.hearthstonejson.com/v1/render/latest/enUS/512x/${this.props.id}.png`}
            alt={this.props.name}
            style={{
              height: height + (30 + 79) * (height / 744),
              width: 'auto',
              marginTop: -30 * (height / 744),
            }}
          />
        </div>
      );
    }

    return (
      <div
        className={styles.wrapper}
        ref={ref => this.ref = ref}
        onMouseEnter={this.onMouseOver}
        onMouseLeave={this.onMouseOut}
      >
        <ManaGem>{this.props.count}</ManaGem>
        <div className={styles.cardName}>
          {this.props.name}
        </div>
        <div className={styles.countBadge}>
          {this.props.count}
        </div>
        {tooltip}
      </div>
    );
  }
}
