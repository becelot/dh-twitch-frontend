import React from 'react';
import { Props } from './index';
import styled from 'styled-components';


const Wrapper = styled.div`
  width: 300px;
  height: 100%;
  position: relative;
`;

const SidebarToggle = styled.div<{ expanded: boolean; width: number }>`
  position: absolute;
  width: ${props => props.expanded ? '46' : '120'}px;
  height: 46px;
  top: calc(50% - 23px);
  left: ${props => props.expanded ? props.width : '10'}px;
  background: linear-gradient(65deg, #410000, #000739);
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  border-top-left-radius: 2px;
  border-bottom-leftt-radius: 2px;
  
  box-shadow: inset 0 0 0 rgb(160, 160, 160);
  box-sizing: border-box;
  
  transition: box-shadow 0.2s ease-in-out,
              border 0.2s ease-in-out,
              left 0.2s ease-in-out,
              width 0.2s ease-in-out;
              
  display: flex;
  flex-direction: row;
  
  ${''/*
  &:after {
    content: "";
    position: absolute;
    
    border-left: 25px solid rgb(161, 161, 161);
    border-bottom: 12.5px solid transparent;
    border-top: 12.5px solid transparent;
    
    left: 12.5px;
    top: calc(50% - 12.5px);
    
    transition: border-left 0.2s ease-in-out, transform 0.2s ease-in-out;
    
    transform: rotateZ(${props => props.expanded ? '180' : '0'}deg);
    transform-origin: center center;
  }
  
  &:before {
    content: "";
    position: absolute;
    
    border-left: 28px solid rgb(90,90,90);
    border-bottom: 14px solid transparent;
    border-top: 14px solid transparent;
    
    left: 11.5px;
    top: calc(50% - 14px);
    
    transform: rotateZ(${props => props.expanded ? '180' : '0'}deg);
    transform-origin: center center;
    
    transition: transform 0.2s ease-in-out;
  }
  
  &:hover {
    box-shadow: inset 0 0 10px rgb(130, 130, 130);
    
    &:after {
      border-left: 25px solid rgb(30, 30, 30);
    }
  }*/}
`;

const HiddenContent = styled.div<{expanded: boolean; width: number}>`
  position: relative;
  overflow: hidden;
  border: 1px solid rgb(214, 214, 214);
  box-shadow: 1px 0 10px rgb(132, 132, 132);
  top: 0;
  left: 0;
  height: 100%;
  float: left;
  width: ${props => props.expanded ? props.width : '0'}px;
  
  transition: width 0.25s ease-in-out;
`;

const ToggleBadge = styled.div<{expanded: boolean}>`
  flex: 1 1 auto;
  line-height: 46px;
  justify-content: center;
  text-align: center;
  overflow: hidden;
`;

const ToggleSelector = styled.div<{expanded: boolean}>`
  position: relative;
  flex: 0 0 46px;
  
  &:after {
    content: "";
    position: absolute;
    
    border-left: 25px solid rgb(161, 161, 161);
    border-bottom: 12.5px solid transparent;
    border-top: 12.5px solid transparent;
    
    left: 8px;
    top: calc(50% - 12.5px);
    
    transition: border-left 0.2s ease-in-out, transform 0.2s ease-in-out;
    
    transform: rotateZ(${props => props.expanded ? '180' : '0'}deg);
    transform-origin: center center;
  }
`;

interface State {
  expanded: boolean;
}

export default class extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = { expanded: false };
  }

  public render() {
    return (
      <Wrapper>
        <HiddenContent expanded={this.state.expanded} width={this.props.width}>Hallo Welt</HiddenContent>
        <SidebarToggle
          expanded={this.state.expanded}
          width={this.props.width}
          onClick={_ => this.setState(() => ({expanded: !this.state.expanded}))}
        >
          <ToggleBadge expanded={this.state.expanded} >DH</ToggleBadge>
          <ToggleSelector expanded={this.state.expanded} />
        </SidebarToggle>
      </Wrapper>
    );
  }
}
