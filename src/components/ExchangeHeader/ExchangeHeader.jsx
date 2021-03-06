import React, { Component } from 'react';
import styled from 'styled-components';
import logo from './logo.svg';
import { H1 } from '../styledCSS';

const Header = styled.header`
  background-color: #FFFFFF;
  min-height: 10vh;
  width: 100%;
  display: flex;
  flex-direction: row; /* Column -> items stacked atop of each other*/
  align-items: center;
  justify-content: flex-start;
  font-size: 36px;
  /* font-size: calc(10px + 2vmin); */
  color: black;
`;

const Img = styled.img`
  height: 8rem;
  pointer-events: none;
`;

export default class ExchangeHeader extends Component {
    render() {
      return (
        <Header>
          <Img src={logo} alt="React logo"/>
          <H1>
            Coin Exchange
          </H1>
        </Header>
        )
    }
}
