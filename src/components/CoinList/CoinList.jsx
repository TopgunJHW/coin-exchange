import React from 'react'
import Coin from '../Coin/Coin';
import styled from 'styled-components';
import { Button } from '../styledButtons';
import { findObject } from '../functions';

const Table = styled.table`
  display: inline-block;
  width: 80%;
  font-size: 1rem;
  background-color: white;
  color: black;
  box-shadow: 0 0 5px grey;
`;

const Thead = styled.thead`
  background-color: rgba(97, 218, 251, .2)
`;

const Section = styled.section`
  display: inline-block;
  width: 80%;
  margin-bottom: 50px;
`;

const Select = styled.select`
  display: inline-block;
  width: 5rem;
`;

export default function CoinList(props) {

  const handleCoinCount = (event) => {
    // Prevent the default action of submitting the form
    event.preventDefault();
    props.handleCoinCount(parseInt(event.target.value));
  };

  const handleStartCoinCount = (event) => {
    event.preventDefault();
    const multiplier = parseInt(event.target.value);
    let startCount = props.startCoinCount + props.coinCount * multiplier;

    if (startCount < 0){
      startCount = 0;
    }

    props.handleStartCoinCount(startCount)
  }
  return (
    <>
    <Table className='table table-hover'>
      <Thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Ticker</th>
          <th>Market Cap</th>
          <th>Price
          </th>
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
    <Section>
      <Button className="btn btn-outline-info" onClick={handleStartCoinCount} value={-1}>&#10094;Previous</Button>
      <Select className="form-control" onChange={handleCoinCount}>
        <option value="10">10</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </Select>
      <Button className="btn btn-outline-info" onClick={handleStartCoinCount} value={1}>Next&#10095;</Button>
    </Section>
    </>
  );
};
