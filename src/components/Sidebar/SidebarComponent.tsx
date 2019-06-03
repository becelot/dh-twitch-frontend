import React from 'react';
import { connect } from 'react-redux';
import * as Types from 'Types';
import { Props } from './index';
import styled from 'styled-components';

const mapStateToProps = (state: Types.RootState) => ({
  expanded: state.sidebar.expanded,
  width: state.config.appearance.overlay.width,
  visible: state.sidebar.visible || state.sidebar.expanded,
});


const Wrapper = styled.div`
  width: 400px;
  height: 100%;
  position: relative;
`;

const SidebarToggle = connect(mapStateToProps)(styled.div<{ expanded: boolean; width: number; visible: boolean }>`
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
              width 0.2s ease-in-out,
              transform 0.2s ease-in-out;
              
  display: flex;
  flex-direction: row;
  
  transform: translateX(${props => props.visible ? '0' : '-150'}px);
  
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
`);

const HiddenContent = connect(mapStateToProps)(styled.div<{expanded: boolean; width: number}>`
  position: relative;
  overflow: ${props => props.expanded ? 'unset' : 'hidden'};
  box-shadow: ${props => props.expanded ? '1px 0 10px 10px rgb(55,88,141,0.5)' : 'unset'};
  top: 0;
  left: 0;
  height: 100%;
  float: left;
  width: ${props => props.width}px;
  transform: translateX(-${props => props.expanded ? '0' : props.width.toString() }px);
  transform-origin: left center;
  
  transition: transform 0.25s ease-in-out,
              box-shadow 0.35s ease-in-out;
`);

const ToggleBadge = connect(mapStateToProps)(styled.div<{expanded: boolean}>`
  flex: 1 1 auto;
  line-height: 46px;
  justify-content: center;
  text-align: center;
  overflow: hidden;
`);

const ToggleSelector = connect(mapStateToProps)(styled.div<{expanded: boolean}>`
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
`);


export default class extends React.Component<Props> {
  private visibilityTimeout: number | null = null;

  public onMouseOut = () => {
    if (!this.props.expanded) {
      this.visibilityTimeout = setTimeout(() => this.props.setVisibility(false), 5000);
    }
  };

  public onMouseEnter = () => {
    if (this.visibilityTimeout) {
      window.clearTimeout(this.visibilityTimeout);
    }

    this.props.setVisibility(true);
  };

  public render() {
    return (
      <Wrapper onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseOut}>
        <HiddenContent>{this.props.children}</HiddenContent>
        <SidebarToggle onClick={this.props.toggleSidebar}>
          <ToggleBadge>DH</ToggleBadge>
          <ToggleSelector />
        </SidebarToggle>
      </Wrapper>
    );
  }
}
