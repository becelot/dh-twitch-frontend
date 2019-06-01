import { DeckDefinition, decode } from 'deckstrings';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { HearthDB } from '../../model/hearthstone/state';
import CardTile from '../CardTile/';
import { ICardTile } from '../CardTile/CardTileComponent';

import ScrollArea from 'react-scrollbar';



const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  
  display: flex;
  flex-direction: column;
`;

const DeckListWrapper = styled.div`
  width: 260px;
  position: relative;
  padding-left: 5px;
  
  ul {
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
  }
`;


const Header = styled.div`
  flex: 0 0 40px;
`;

interface Props {
  deckName: string;
  deckCode: string;
}


export default class extends React.Component<Props & {db: HearthDB}> {

  renderDeckList(deckList: ICardTile[]) {
    const childrean: ReactElement[] = [];

    deckList.forEach(card => childrean.push(
      <li key={card.id}>
        <CardTile count={card.count} id={card.id} name={card.name} cost={card.cost} />
      </li>)
    );

    return childrean;
  }

  public generateTileInfo = (deckCode: string): ICardTile[]  => {
    const deck: DeckDefinition = decode(deckCode);

    return deck.cards.map(card => {
      const realCard = this.props.db[card[0]];
      return {
        id: realCard.id || '' ,
        name: realCard.name || '',
        count: card[1],
        cost: realCard.cost || 0,
      };
    })
      .sort((a, b) => a.name.localeCompare(b.name))
      .sort((a, b) => a.cost - b.cost);
  };

  public render() {
    return (
      <Wrapper>
        <Header>
          Test
        </Header>
        <ScrollArea
          style={{
            flex: '1 1 0',
            display: 'inline-block',
            width: '285px',
            alignSelf: 'center',
            borderLeft: '3px solid #84672D',
            borderTop: '3px solid #EAC884',
            borderRight: '3px solid #84672D',
            borderBottom: '3px solid #4E391F',
            textAlign: 'center',
            background: 'linear-gradient(65deg,rgba( 84, 124, 188, 0.7),rgba(55,88,141, 0.7))',
            overflow: 'hidden',
          }}
          smoothScrolling={true}
          speed={0.8}
        >
          <DeckListWrapper>
            <ul>

              {this.renderDeckList(this.generateTileInfo(this.props.deckCode))}

            </ul>
          </DeckListWrapper>
        </ScrollArea>
      </Wrapper>
    );
  }
}
