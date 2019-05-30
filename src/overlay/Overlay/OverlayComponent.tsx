import React from 'react';
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  
  display: flex;
  flex-direction: column;
  
  background: rgba(0,0,0, 0.5);
`;


export default class extends React.Component {
  public render() {
    return (
      <Sidebar>
        <Wrapper>
          Hallo Welt
        </Wrapper>
      </Sidebar>
    );
  }
}
