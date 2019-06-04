import { Portal } from '@material-ui/core';
import * as React from 'react';

import { Props } from './index';
import styled from 'styled-components';
import ManaGem from '../ManaGem';

interface ICardTileInfo {
  cardTileHeight: number;
  cardTileWidth: number;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  position: absolute;
`;

const CardNameText = styled.div<ICardTileInfo & {cardId: string}>`
    flex: 1 1 auto;
    margin-left: -${props => props.cardTileHeight / (2 * Math.sqrt(3))}px;
    padding-left: 15px;

    text-align: left;
    line-height: ${props => props.cardTileHeight}px;

    font-family: sans-serif;
    font-weight: bold;
    font-size: 0.9em;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    color: white;

    // background
    background: linear-gradient(
                    to right,
                    #2F2D2E 0%,
                    #2F2D2E 25%,
                    rgba(47,45,46,0.8) 40%,
                    rgba(47,45,46,0.4) 50%,
                    rgba(47,45,46,0) 55%,
                    rgba(47,45,46,0)), url("https://art.hearthstonejson.com/v1/tiles/${props => props.cardId}.png");
    background-repeat: no-repeat;
    background-size: ${props => props.cardTileWidth - 32 - (props.cardTileHeight * Math.sqrt(3) / 2)}px 32px;

    box-shadow: 0 -1px 1px black, 0 1px 1px black;
`;

const CountBadge = styled.div<ICardTileInfo>`
  width: ${props => props.cardTileHeight};
  height: ${props => props.cardTileHeight};
  position: relative;
  margin-left: -0.3px;
  background: linear-gradient(#585958, #585958 10%, #272323 70%, #0C0B0C 95%, #0C0B0C);
  font-family: sans-serif;
  font-weight: bold;
  font-size: 1.3em;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;


  flex: 0 0 ${props => props.cardTileHeight}px;

  text-align: center;
  color: white;
  line-height: ${props => props.cardTileHeight}px;
  box-shadow: 0px -1px 1px black, 0 1px 1px black, 1px 0 1px black;

  &:before {
    content: "";
    position: absolute;
    width: ${props => props.cardTileHeight / 2}px;
    height: ${props => props.cardTileHeight}px;
    left: 0;

    background: linear-gradient(#585958, #585958 10%, #272323 70%, #0C0B0C 95%, #0C0B0C);
    transform: skewX(26deg);
    transform-origin: bottom left;
  }

  &:after {
    content: "";
    position: absolute;
    width: 3px;
    height: ${props => props.cardTileHeight}px;
    left: 4px;

    background: linear-gradient(#F5BC3B, #ECE43C, #F5BC3B);
    transform: skewX(26deg);
    transform-origin: bottom left;
  }
`;

const CardImage = styled.div<{height: number; x: number; y: number}>`
  position: absolute;
  height: ${props => props.height}px;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
  
  overflow: hidden;
  
  img {
    height: ${props => props.height + (30 + 79) * (props.height / 744)}px;
    width: auto;
    margin-top: ${props => -30 * (props.height / 744)}px;
  }
`;

export interface ICardTile {
  count: number;
  id: string;
  name: string;
  cost: number;
}

interface State {
  hovered: boolean;
}

export default class extends React.Component<Props & ICardTile, State> {
  public ref: HTMLDivElement | null = null;

  public constructor(props: Props & ICardTile) {
    super(props);

    this.state = {hovered: false};
  }

  public onMouseOver = () => {
    this.setState((state) => {
      return {...state, hovered: true};
    });
  };

  public onMouseOut = () => {
    this.setState((state) => {
      return {...state, hovered: false};
    });
  };

  public render() {
    let tooltip = null;
    if (this.ref && this.state.hovered) {
      const rect = this.ref && this.ref.getBoundingClientRect();

      let y = 0;
      let x = 0;
      if (rect) {
        y = rect.bottom - rect.height / 2;
        x = rect.right - rect.width / 2;
      }

      const viewPortHeight = window.innerHeight;

      const vh = viewPortHeight / 100;
      const height = vh * 46.25;

      const elementWidth = rect.width;

      const topMargin = 50;
      const bottomMargin = 40;

      let posTop = 0;
      if (y - height / 2 < topMargin) {
        posTop = topMargin;
      } else if (y + height / 2 > viewPortHeight - bottomMargin) {
        posTop = viewPortHeight - bottomMargin - height;
      } else {
        posTop = y - height / 2;
      }

      tooltip = (
        <Portal>
          <CardImage x={rect.width + 30} y={posTop} height={height}>
            <img
              src={`https://art.hearthstonejson.com/v1/render/latest/enUS/512x/${this.props.id}.png`}
              alt={this.props.name}
            />
          </CardImage>
        </Portal>
      );
    }

    return (
      <Wrapper
        ref={ref => this.ref = ref}
        onMouseEnter={this.onMouseOver}
        onMouseLeave={this.onMouseOut}
      >
        <ManaGem>{this.props.cost}</ManaGem>
        <CardNameText
          cardId={this.props.id}
          cardTileHeight={this.props.cardTileHeight}
          cardTileWidth={this.props.width}
        >
          {this.props.name}
        </CardNameText>
        <CountBadge cardTileHeight={this.props.cardTileHeight} cardTileWidth={this.props.width}>
          {this.props.count}
        </CountBadge>
        {tooltip}
      </Wrapper>
    );
  }
}
