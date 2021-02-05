import React from 'react'
import Coin from '../Coin/Coin';
import styled from 'styled-components';

const Table = styled.table`
  margin-bottom: 50px;
  display: inline-block;
  width: 80%;
  font-size: 1rem;
`;

export default function CoinList(props) {
  return (
    <Table className='table table-primary table-bordered'>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Ticker</th>
          <th>Price</th>
          <th>Market Cap</th>
          <th>Balance</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
          {
            // key values is needed for optimally rendering in react. 
            props.coinData.map( ({key, name, ticker, price, marketCap, balance}, index) =>
              <Coin key={key}
                    handleRefresh={props.handleRefresh}
                    handleTransaction={props.handleTransaction}
                    name={name}
                    ticker={ticker}
                    balance={balance}
                    price={price}
                    marketCap={marketCap}
                    showBalance={props.showBalance}
                    tickerID={key}
                    rank={index} />
            )
          }
      </tbody>
    </Table>
  );
};
