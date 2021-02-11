import React from 'react';
import WalletCoin from './WalletCoin';
import styled from 'styled-components';

const Table = styled.table`
  display: inline-block;
  
  font-size: 1rem;
  background-color: white;
  color: black;
  box-shadow: 0 0 5px grey;
  margin-bottom: 0;
`;

const Thead = styled.thead`
  background-color: rgba(97, 218, 251, .2)
`;

export default function WalletList(props) {

  return (
    <Table className='table table-hover'>
      <Thead>
        <tr>
          <th>Name</th>
          <th>Ticker</th>
          <th>Balance</th>
          <th>BTC Value</th>
          <th>USD Value</th>
          <th>Actions</th>
        </tr>
      </Thead>
      <tbody>
          {
            // key values is needed for optimally rendering in react. 
            props.coinHoldings.map( function({key, name, ticker, balance, priceUSD}) {
              return <WalletCoin
                        key={key}
                        tickerID={key}
                        ticker={ticker}
                        name={name}
                        balance={balance}
                        priceUSD={priceUSD}
                        priceOfBTC={props.priceOfBTC}
                        showBalance={props.showBalance}/>
            })
          }
      </tbody>
    </Table>
  );
};
