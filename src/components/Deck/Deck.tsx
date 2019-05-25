import React, { ReactElement } from 'react';
import { CardTile, ICardTile } from '../Card/CardTile';

interface Props {
  deckName: string;
  deckList: ICardTile[];
}


export class DeckComponent extends React.Component<Props> {

  renderDeckList(deckList: ICardTile[]) {
    const childrean: ReactElement[] = [];

    deckList.forEach(card => childrean.push(<li><CardTile count={card.count} id={card.id} name={card.name} /></li>));

    return childrean;
  }

  public render() {
    return (
      <div style={{position: 'relative'}}>
        {this.renderDeckList(this.props.deckList)}
      </div>
    );
  }
}
