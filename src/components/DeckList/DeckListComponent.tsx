import { DeckDefinition, decode } from 'deckstrings';
import { CardData } from 'hearthstonejson-client';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { HearthDB } from '../../model/hearthstone/state';
import CardTile from '../CardTile/';
import { ICardTile } from '../CardTile/CardTileComponent';

import ScrollArea from 'react-scrollbar';


import DruidBadge from '../../assets/hero_badges/druid.png';
import HunterBadge from '../../assets/hero_badges/hunter.png';
import MageBadge from '../../assets/hero_badges/mage.png';
import PaladinBadge from '../../assets/hero_badges/paladin.png';
import PriestBadge from '../../assets/hero_badges/priest.png';
import RogueBadge from '../../assets/hero_badges/rogue.png';
import ShamanBadge from '../../assets/hero_badges/shaman.png';
import WarlockBadge from '../../assets/hero_badges/warlock.png';
import WarriorBadge from '../../assets/hero_badges/warrior.png';


import DruidBg from '../../assets/hero_bg/druid.jpg';
import PriestBg from '../../assets/hero_bg/priest.jpg';

import CopyToClipboardIcon from '../../assets/icons/CopyUrlLink.svg';

interface Dictionary {
  [key: string]: string;
}

const ClassToBg: Dictionary = {
  DRUID: DruidBg,
  PRIEST: PriestBg,
  DEFAULT: 'unset',
};

const ClassToBadge: Dictionary = {
  DRUID: DruidBadge,
  HUNTER: HunterBadge,
  MAGE: MageBadge,
  PALADIN: PaladinBadge,
  PRIEST: PriestBadge,
  ROGUE: RogueBadge,
  SHAMAN: ShamanBadge,
  WARLOCK: WarlockBadge,
  WARRIOR: WarriorBadge,
  DEFAULT: '',
};

const ClassToGradient: Dictionary = {
  DRUID: 'linear-gradient(#5A4341,#5A4341 10%,#7C5D5C 95%,#7C5D5C)',
  PRIEST: 'linear-gradient(#114759,#114759 10%,#285F6E 95%,#285F6E);',
  DEFAULT: 'linear-gradient(#585958, #585958 10%, #272323 70%, #0C0B0C 95%, #0C0B0C)',
};

const ClassToBgGradient: Dictionary = {
  DRUID: 'linear-gradient(65deg, rgba(90, 67, 65, 0.7), rgba(124, 93, 92, 0.7))',
  PRIEST: 'linear-gradient(65deg, rgba(17, 71, 89, 0.7), rgba(40, 95, 110, 0.7))',
  DEFAULT: 'linear-gradient(65deg,rgba( 84, 124, 188, 0.7),rgba(124, 93, 92, 0.7))',
};



const Wrapper = styled.div<{hero: string}>`
  width: 100%;
  height: 100%;
  position: relative;
  
  display: flex;
  flex-direction: column;
  
  background: url(${props => props.hero in ClassToBg ? ClassToBg[props.hero]  : ClassToBg.DEFAULT});
  background-size: cover;
  background-position: center center;
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


const Header = styled.div<{hero: string}>`
  position: relative;
  flex: 0 0 28px;
  line-height: 28px;
  
  background: ${props => props.hero in ClassToBadge ? ClassToGradient[props.hero] : ClassToGradient.DEFAULT};
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
  
  &:before {
    content: "";
    position: absolute;
    top: 4px;
    left: calc(100% - 24px);
    
    width: 20px;
    height: 20px;
    
    background: url(${CopyToClipboardIcon});
  }
  
  &:after {
    content: "";
    position: absolute;
    top: -12.75px;
    left: -25.5px;
    
    width: 51px;
    height: 51px;
    border-radius: 50%;
    
    background: url(${props => props.hero in ClassToBadge ? ClassToBadge[props.hero] : ClassToBadge.DEFAULT});
    background-size: cover;
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

  public generateTileInfo = (cards: Array<[number, number]>): ICardTile[]  => {

    return cards.map(card => {
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
    const deck: DeckDefinition = decode(this.props.deckCode);

    const hero: CardData = this.props.db[deck.heroes[0]];
    const heroClass: string = (hero.cardClass && hero.cardClass.toUpperCase()) || 'DEFAULT';

    return (
      <Wrapper hero={heroClass}>
        <Header hero={heroClass}>
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
            background: heroClass in ClassToBgGradient ? ClassToBgGradient[heroClass] : ClassToBgGradient.DEFAULT,
            overflow: 'hidden',
          }}
          smoothScrolling={true}
          speed={0.8}
        >
          <DeckListWrapper>
            <ul>
              {this.renderDeckList(this.generateTileInfo(deck.cards))}
            </ul>
          </DeckListWrapper>
        </ScrollArea>
      </Wrapper>
    );
  }
}
