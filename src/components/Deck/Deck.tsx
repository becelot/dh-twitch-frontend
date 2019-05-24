import React, { ReactElement } from 'react';
import { CardTile, ICardTile } from '../Card/CardTile';

interface Props {
  deckName: string;
  deckList: ICardTile[];
}


export class DeckComponent extends React.Component<Props> {

  renderDeckList(deckList: ICardTile[]) {
    const childrean: ReactElement[] = [];

    deckList.forEach(card => childrean.push(<CardTile count={card.count} id={card.id} name={card.name} />));

    return childrean;
  }

  public render() {
    return (
      this.renderDeckList(this.props.deckList)
    );
  }
}
