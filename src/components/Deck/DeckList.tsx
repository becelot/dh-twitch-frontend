import React, { ReactElement } from 'react';
import styled from 'styled-components';
import CardTile from '../CardTile/';
import { ICardTile } from '../CardTile/CardTileComponent';

const Wrapper = styled.div`
  width: 260px;
  position: relative;
`;

const DeckListWrapper = styled.ul`
  position: relative;
  list-style-type: none;
  padding-inline-start: 0px;
  
  margin: 0;
  display: flex;
  flex-direction: column;
  
  li {
    height: 32px;
    margin-bottom: 3px;
    position: relative;
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
