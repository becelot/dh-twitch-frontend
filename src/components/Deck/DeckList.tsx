import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { CardTile, ICardTile } from '../Card/CardTile';

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const DeckListWrapper = styled.ul`
  position: relative;
  listStyleType: none;
  
  margin: 0;
  display: flex;
  flexDirection: column;
  
  li {
    height: 32px;
    marginBottom: 3px;
  }
`;

interface Props {
  deckName: string;
  deckList: ICardTile[];
}


export class DeckList extends React.Component<Props> {

  renderDeckList(deckList: ICardTile[]) {
    const childrean: ReactElement[] = [];

    deckList.forEach(card => childrean.push(
      <li key={card.id}>
        <CardTile count={card.count} id={card.id} name={card.name} />
      </li>)
    );

    return childrean;
  }

  public render() {
    return (
      <Wrapper>
        <DeckListWrapper>
          {this.renderDeckList(this.props.deckList)}
        </DeckListWrapper>
      </Wrapper>
    );
  }
}
