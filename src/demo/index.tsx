import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import store from '../model';
import Root from '../overlay/Root';

const twitch: any = {
  ext: {
    rig: {
      // tslint:disable-next-line:no-console
      log: (str: string) => console.log(str),
    },
    onContext: (f: (t: any) => void) => {f({mode: 'config', language: 'en', theme: 'light'}); },
    onAuthorized: (f: (t: any) => void) => {f({channelId: '41762125', clientId: 'z0gblb58yec2zz4g6dt33zagi7tr5o', token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NjQ5MTMyNjAsIm9wYXF1ZV91c2VyX2lkIjoiVTQxNzYyMTI1Iiwicm9sZSI6ImJyb2FkY2FzdGVyIiwicHVic3ViX3Blcm1zIjp7Imxpc3RlbiI6WyJicm9hZGNhc3QiLCJnbG9iYWwiXSwic2VuZCI6WyJicm9hZGNhc3QiXX0sImNoYW5uZWxfaWQiOiI0MTc2MjEyNSIsInVzZXJfaWQiOiI0MTc2MjEyNSIsImlhdCI6MTU2NDgyNjg2MH0.JdETsq_j1-yrG8k-cGEki3aCCibaVOHh3n0VCGsRfoc', userId: 'U41762125'}); },
  },


};

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  
  display: flex;
  flex-direction: column;
  
  position: relative;
`;

const Warning = styled.div`
  position: relative;
  width: 100%;
  color: darkred;
  text-align: center;
  background: orange;
  border-bottom: 2px solid black;
  
  font-size: 2rem;
  font-weight: 500;
  padding-bottom: 20px;
  
  flex: 0 0 0;
`;

const Tutorial = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  color: #3c3c3c;
  font-size: 2rem;
  
`;

window.Twitch = twitch;

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <Wrapper>
      <Warning>Please note: This version is a demo only! As the app is hosted on Heroku, the first load might take some time! Since the app is meant to run in a Twitch.tv stream, this page emulates the necessary details!</Warning>
      <div style={{background: '#e7e7e7', flex: '1 0 0', position: 'relative'}}>
        <Tutorial>
          <div style={{maxWidth: '40vw', textAlign: 'center', color: '#3b3b3b'}}>
            TWITCH STREAM AREA.<br/> Hover on the left edge of this window to open the streaming interface. By default, it is hidden as to not distract the viewer.<br/><br/>
            You can hover over cards, show older decks by browsing using the arrows at the top of the interface, copy the deck and view its win/loss ratio at the bottom.
          </div>
        </Tutorial>
        <Root />
      </div>
    </Wrapper>
  </Provider>,
  rootElement,
);
