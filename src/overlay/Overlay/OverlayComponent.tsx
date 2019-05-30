import React from 'react';
import styled from 'styled-components';
import { DeckList } from '../../components/Deck/DeckList';
import Sidebar from '../../components/Sidebar';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  
  display: flex;
  flex-direction: column;
  
  background: rgba(55,88,141, 0.5);
  user-select: none;
`;

const Header = styled.h2`
  position: relative;
  flex: 0 0 auto;
  height: 50px;
  background: linear-gradient(#585958, #585958 10%, #272323 70%, #0C0B0C 95%, #0C0B0C);
  
  color: white;
  text-align: center;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  line-height: 44px;
  
  border-left: 3px solid #84672D;
  border-top: 3px solid #EAC884;
  border-right: 3px solid #84672D;
  border-bottom: 3px solid #4E391F;
`;

const DeckListWrapper = styled.div`
  position: relative;
  flex: 0 0 auto;
  height: calc(100% - 200px);
  width: auto;
  
  background: url("https://gamepedia.cursecdn.com/hearthstone_gamepedia/3/31/Thrall-full.jpg?version=cb83492715975917d2416b8832ea9751");
  background-size: auto calc(100vh - 60px);
  background-position: -200px -140px;
  background-repeat: no-repeat;
  
  display: flex;
  justify-content: center;
  
`;

const Footer = styled.div`
  position: relative;
  flex: 1 0 50px;
`;


export default class extends React.Component {
  public render() {
    return (
      <Sidebar>
        <Wrapper>
          <Header>Deck History Tracker</Header>
          <DeckListWrapper>
            <DeckList deckList={[{id: 'UNG_035', name: 'Curious Glimmerroot', count: 1}]} deckName={''}/>
          </DeckListWrapper>
          <Footer />
        </Wrapper>
      </Sidebar>
    );
  }
}
