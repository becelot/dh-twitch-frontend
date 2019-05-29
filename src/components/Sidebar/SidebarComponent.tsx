import React from 'react';
import { Props } from './index';
import styled from 'styled-components';


const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const SidebarToggle = styled.div<{ expanded: boolean }>`
  position: absolute;
  width: 50px;
  height: 46.5vh;
  top: 26.75vh;
  left: ${props => props.expanded ? '180' : '0'}px;
  background: linear-gradient(to right, rgb(211, 211, 211), rgb(176, 176, 176));
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  
  border: 1.5px solid rgb(160, 160, 160);
  box-shadow: inset 0 0 0 rgb(160, 160, 160);
  box-sizing: border-box;
  
  transition: box-shadow 0.2s ease-in-out,
              border 0.2s ease-in-out,
              left 0.2s ease-in-out;
  
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
    border: 3px solid rgb(170, 170, 170);
    
    &:after {
      border-left: 28px solid rgb(30, 30, 30);
    }
  }
`;

const HiddenContent = styled.div<{expanded: boolean}>`
  position: absolute;
  overflow: hidden;
  border: 1px solid rgb(214, 214, 214);
  box-shadow: 1px 0 10px rgb(132, 132, 132);
  top: 0;
  left: 0;
  width: ${props => props.expanded ? '180' : '0'}px;
  height: 100%;
  
  transition: width 0.2s ease-in-out;
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
        <HiddenContent expanded={this.state.expanded}>Hallo Welt</HiddenContent>
        <SidebarToggle expanded={this.state.expanded} onClick={e => this.setState(() => ({expanded: !this.state.expanded}))} />
      </Wrapper>
    );
  }
}
