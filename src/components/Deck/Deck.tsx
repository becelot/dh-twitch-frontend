import React, { ReactElement } from 'react';
import { CardTile, ICardTile } from '../Card/CardTile';

interface Props {
  deckName: string;
  deckList: ICardTile[];
}


export class DeckComponent extends React.Component<Props> {

  renderDeckList(deckList: ICardTile[]) {
    const childrean: ReactElement[] = [];

    deckList.forEach(card => childrean.push(<li key={card.id} style={{height: '32px', marginBottom: '3px'}}><CardTile count={card.count} id={card.id} name={card.name} /></li>));

    return childrean;
  }

  public render() {
    return (
      <div style={{width: '100%', position: 'relative'}}>
        <ul style={{position: 'relative', listStyleType: 'none', margin: 0, display: 'flex', flexDirection: 'column'}}>
          {this.renderDeckList(this.props.deckList)}
        </ul>
      </div>
    );
  }
}
