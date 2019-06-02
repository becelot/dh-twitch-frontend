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
    padding-top: 6px;
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
  position: relative;
  flex: 0 0 28px;
  line-height: 28px;
  
  background: linear-gradient(#585958, #585958 10%, #272323 70%, #0C0B0C 95%, #0C0B0C);
  border-left: 3px solid #84672D;
  border-top: 3px solid #EAC884;
  border-right: 3px solid #84672D;
  border-bottom: 3px solid #4E391F;
  
  margin-left: 25.5px;
  box-sizing: border-box;
  
  color: white;
  text-align: center;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  font-weight: bold;
  
  z-index: 2;
  
  &:after {
    content: "";
    position: absolute;
    top: -12.75px;
    left: -25.5px;
    
    width: 51px;
    height: 51px;
    border-radius: 50%;
    border: 1px solid gold;
    
    background: white;
  }
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
          {this.props.deckName}
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
