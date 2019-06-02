import { ButtonBase, CircularProgress, IconButton, withStyles } from '@material-ui/core';
import { ArrowRight, ArrowLeft } from '@material-ui/icons';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import DeckList from '../../components/DeckList';
import Sidebar from '../../components/Sidebar';
import { OverlayState } from '../../model/overlay/state';
import { Props } from './index';

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
  flex: 1 0 auto;
  // height: calc(100% - 200px);
  width: auto;
  
  // background: url("https://c-2rtwjumjzx7864x24lfrjujinfx2ehzwx78jhisx2ehtr.g00.gamepedia.com/g00/3_c-2mjfwymx78ytsj.lfrjujinf.htr_/c-2RTWJUMJZX64x24myyux78x3ax2fx2flfrjujinf.hzwx78jhis.htrx2fmjfwymx78ytsj_lfrjujinfx2f9x2f96x2fFsizns-kzqq.oulx3fajwx78ntsx3d36934j43597jkff8873f8241fh661024_$/$/$/$/$?i10c.ua=1&i10c.dv=15");
  // background-size: auto calc(100vh - 60px);
  // background-position: -200px -140px;
  // background-repeat: no-repeat;
  
  text-align: center;
  
`;

const DeckListShown = styled.div<{index: number; currentIndex: number}>`
  position: absolute;
  height: 100%;
  width: 100%;
  
  transform: rotateY(${props => (props.currentIndex === props.index ? 0 : (props.currentIndex > props.index ? -90 : 90)).toString()}deg);
  transform-origin: 155px 0 -155px;
  
  transition: transform 0.45s ease-in-out;
`;

const Footer = styled.div`
  position: relative;
  flex: 0 0 50px;
`;

const StateLoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: rgb(214,214,214, 0.8);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ArrowButton = withStyles({
  root: {
    borderRadius: '50%',
    height: '24px',
    top: '10px',
  },
})(ButtonBase);


export default class extends React.Component<Props> {

  public componentDidMount(): void {
    this.props.fetchRecent();
  }

  public renderRecentDecks = () => {
    const renderedDecks: ReactElement[] = [];

    for (let i = 0; i < this.props.recentDecks.length; i++) {
      renderedDecks.push(
        <DeckListShown
          index={i}
          currentIndex={this.props.index}
          key={this.props.recentDecks[i].code}
        >
          <DeckList
            deckName={this.props.recentDecks[i].name}
            deckCode={this.props.recentDecks[i].code}
          />
        </DeckListShown>
        );
    }

    return renderedDecks;
  };

  public render() {

    let content = null;

    switch (this.props.working) {
      case OverlayState.UNKNOWN:
        content = null;
        break;
      case OverlayState.IDLE:
        content = (
          <>
            {this.renderRecentDecks()}
          </>
        );
        break;
      case OverlayState.REQUEST_ERROR:
        content = (
          <StateLoadingWrapper>
            <div>
              <p>Error contacting Deck History Server</p>
              <p>{this.props.error}</p>
            </div>
          </StateLoadingWrapper>
        );
        break;
      case OverlayState.REQUEST_PENDING:
        content = (
          <StateLoadingWrapper>
            <div>
              <p>Loading deck list</p>
              <CircularProgress thickness={4} size={50} />
            </div>
          </StateLoadingWrapper>
        );
    }


    return (
      <Sidebar>
        <Wrapper>
          <Header>
            <ArrowButton title={'Previous'} disabled={!this.props.hasPrevious} onClick={this.props.previousDeck}>
              <ArrowLeft />
            </ArrowButton>
            <div><div>Deck History Tracker</div><div><span>{this.props.currentDeckLabel}</span></div></div>
            <ArrowButton title={'Next'} disabled={!this.props.hasNext} onClick={this.props.nextDeck}>
              <ArrowRight />
            </ArrowButton>
          </Header>
          <DeckListWrapper>
            {content}
          </DeckListWrapper>
          <Footer />
        </Wrapper>
      </Sidebar>
    );
  }
}
