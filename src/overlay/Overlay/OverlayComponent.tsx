import { ButtonBase, IconButton, withStyles } from '@material-ui/core';
import { ArrowRight, ArrowLeft } from '@material-ui/icons';
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

const Header = styled.div`
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
  
  display: flex;
  flex-direction: row;
  
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  
  div {
    display: flex;
    flex-direction: column;
    flex: 1 1 100%;
    position: relative;
    
    div:nth-child(1) {
      position: relative;
      flex: 1 0 30px;
      line-height: 30px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      
      font-size: 1.2em;
      padding: 0 5px 0 5px;
    }
    
    div:nth-child(2) {
      position: relative;
      flex: 1 1 14px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      padding: 0 5px 0 5px;
      
      font-size: 0.7em;
      line-height: 18px;
      margin-top: -8px;
      display: block;
      
      width: 80%;
      align-self: center;
      
      span {
        display: inline-block;
        position: relative;
        
        &:before,&:after {
          content: "";
          position: absolute;
          height: 4px;
          border-bottom: 0.6px solid white;
          border-top: 0.6px solid white;
          top: 7px;
          width: 600px;
        }
      
        &:before {
          right: 100%;
          margin-right: 15px;
        }
        
        &:after {
          left: 100%;
          margin-left: 15px;
        }
      }
    }
  }
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
  
  text-align: center;
  
`;

const Footer = styled.div`
  position: relative;
  flex: 1 0 50px;
`;

const DeckListBox = styled.div`
  position: relative;
  align-self: center;
  width: 280px;
  
  border-left: 3px solid #84672D;
  border-top: 3px solid #EAC884;
  border-right: 3px solid #84672D;
  border-bottom: 3px solid #4E391F;
  
  display: inline-block;
  text-align: center;
  background: rgb(55,88,141);
  padding: 10px 0 10px 0;
`;

const ArrowButton = withStyles({
  root: {
    borderRadius: '50%',
    height: '24px',
    top: '10px',
  },
})(ButtonBase);


export default class extends React.Component {
  public render() {
    return (
      <Sidebar>
        <Wrapper>
          <Header>
            <ArrowButton title={'Previous'}>
              <ArrowLeft />
            </ArrowButton>
            <div><div>Your deckname here gg</div><div><span>current deck</span></div></div>
            <ArrowButton title={'Next'}>
              <ArrowRight />
            </ArrowButton>
          </Header>
          <DeckListWrapper>
            <DeckListBox>
              <DeckList deckList={[{id: 'UNG_035', name: 'Curious Glimmerroot', count: 1}]} deckName={''}/>
            </DeckListBox>
          </DeckListWrapper>
          <Footer />
        </Wrapper>
      </Sidebar>
    );
  }
}
