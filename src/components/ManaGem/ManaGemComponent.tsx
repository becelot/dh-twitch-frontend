import * as React from 'react';
import styled from 'styled-components';
import { Props } from './index';

interface IHexagonTile {
  cardTileHeight: number;
}

const Hexagon = styled.div<IHexagonTile>`
  width: ${props => 2 * props.cardTileHeight / Math.sqrt(3)}px;
  height: ${props => props.cardTileHeight}px;
  position: relative;
  line-height: ${props => props.cardTileHeight}px;
`;

interface IHexagonSite extends IHexagonTile {
  n: number;
  color: string;
}

const HexagonSite = styled.div<IHexagonSite>`
  position: absolute;
  width: 0;
  height: 0;

  border-top: ${props => props.cardTileHeight / 2}px solid ${props => props.color};
  border-right: ${props => props.cardTileHeight / (2 * Math.sqrt(3)) + 0.01}px solid transparent;
  border-left: ${props => props.cardTileHeight / (2 * Math.sqrt(3)) + 0.01}px solid transparent;

  left: ${props => props.cardTileHeight / (2 * Math.sqrt(3)) + 0.01}px;


  -webkit-transform: rotate(${props => props.n * 60}deg);
  -moz-transform: rotate(${props => props.n * 60}deg);
  -ms-transform: rotate(${props => props.n * 60}deg);
  -o-transform: rotate(${props => props.n * 60}deg);
  transform: rotate(${props => props.n * 60}deg);

  transform-origin: bottom center;
`;

const HexagonShadow = styled(HexagonSite)<IHexagonSite>`
  box-shadow: 0 -1px 1px black;
`;

const ManaCostText = styled.div<IHexagonTile>`
  font-family: sans-serif;
  font-weight: bold;
  font-size: 1em;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  color: white;
  line-height: ${props => props.cardTileHeight}px;
  position: absolute;
  width: ${props => 2 * props.cardTileHeight / Math.sqrt(3)}px;
  height: ${props => props.cardTileHeight};
  z-index: 2;
  text-align: center;
`;

export default class extends React.Component<Props> {
  public render() {
    return (
      <Hexagon cardTileHeight={this.props.cardTileHeight}>
        <ManaCostText cardTileHeight={this.props.cardTileHeight}>
          {this.props.children}
        </ManaCostText>
        <HexagonShadow n={0} cardTileHeight={this.props.cardTileHeight} color={'black'} />
        <HexagonShadow n={1} cardTileHeight={this.props.cardTileHeight} color={'black'} />
        <HexagonShadow n={2} cardTileHeight={this.props.cardTileHeight} color={'black'} />
        <HexagonShadow n={3} cardTileHeight={this.props.cardTileHeight} color={'black'} />
        <HexagonShadow n={4} cardTileHeight={this.props.cardTileHeight} color={'black'} />
        <HexagonShadow n={5} cardTileHeight={this.props.cardTileHeight} color={'black'} />

        <HexagonSite n={0} cardTileHeight={this.props.cardTileHeight} color={'#1D88C5'} />
        <HexagonSite n={1} cardTileHeight={this.props.cardTileHeight} color={'#006BD6'} />
        <HexagonSite n={2} cardTileHeight={this.props.cardTileHeight} color={'#155CA2'} />
        <HexagonSite n={3} cardTileHeight={this.props.cardTileHeight} color={'#112860'} />
        <HexagonSite n={4} cardTileHeight={this.props.cardTileHeight} color={'#143364'} />
        <HexagonSite n={5} cardTileHeight={this.props.cardTileHeight} color={'#053A6E'} />
      </Hexagon>
    );
  }
}
