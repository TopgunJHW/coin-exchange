import React from 'react'
import Coin from './Coin';
import styled from 'styled-components';
import { findObject } from '../functions';

const Table = styled.table`
  display: inline-block;
  width: 77%;
  font-size: 1rem;
  background-color: white;
  color: black;
  box-shadow: 0 0 5px grey;
  margin-bottom: 0;
`;

const Thead = styled.thead`
  background-color: rgba(97, 218, 251, .2)
`;

export default function CoinList(props) {
  return (
    <Table className='table table-hover'>
      <Thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Ticker</th>
          <th>Market Cap</th>
          <th>Price</th>
          <th>Balance</th>
          <th>Actions</th>
        </tr>
      </Thead>
      <tbody>
          {
            // key values is needed for optimally rendering in react. 
            props.coinData.map( function({key, name, ticker, price, marketCap, rank}) {
              const holding = findObject(props.coinHoldings, 'key', key);
              return <Coin 
                        key={key}
                        handleTransaction={props.handleTransaction}
                        name={name}
                        ticker={ticker}
                        balance={holding ? holding.balance : 0}
                        price={price}
                        marketCap={marketCap}
                        showBalance={props.showBalance}
                        tickerID={key}
                        rank={rank} />
            })
          }
      </tbody>
    </Table>
  );
};
