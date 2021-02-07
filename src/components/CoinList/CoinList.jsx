import React from 'react'
import Coin from '../Coin/Coin';
import styled from 'styled-components';
import { Button } from '../styledButtons';
import { findObject, formatter } from '../functions';

const Table = styled.table`
  display: inline-block;
  width: 80%;
  font-size: 1rem;
  background-color: white;
  color: black;
  box-shadow: 0 0 5px grey;
  margin-bottom: 0;
`;

const Thead = styled.thead`
  background-color: rgba(97, 218, 251, .2)
`;

const Section = styled.section`
  display: inline-block;
  width: 80%;
`;

const SectionHead = styled(Section)`
  margin: 50px 0 20px 0;
`;

const SectionFoot = styled(Section)`
  margin: 10px 0 50px 0;
`;

const Select = styled.select`
  display: inline-block;
  width: 5rem;
`;

const Div = styled.div`
  display: inline-block;
  margin: 0 10px 0 10px;
`;

export default function Home(props) {
  
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
    <SectionHead>
      <Div>Market Cap: {formatter.format(props.globalData.marketCap)}</Div>
      <Div>24h Vol: {formatter.format(props.globalData.dailyVol)}</Div>
      <Div>BTC Dominance: {props.globalData.domBTC}%</Div>
      <Button 
          className="btn btn-info"
          onClick={props.handleRefresh}>
          <i className="fas fa-redo"></i> Refresh Data
      </Button>
      </SectionHead>
    <CoinList 
        coinData={props.coinData}
        coinHoldings={props.coinHoldings}
        coinCount={props.coinCount}
        startCoinCount={props.startCoinCount}
        handleTransaction={props.handleTransaction}
        handleCoinCount={props.handleCoinCount}
        handleStartCoinCount={props.handleStartCoinCount}
        showBalance={props.showBalance}/>
    <SectionFoot>
      <Button className="btn btn-outline-info" onClick={handleStartCoinCount} value={-1}>&#10094;Previous</Button>
      <Select className="form-control" onChange={handleCoinCount}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </Select>
      <Button className="btn btn-outline-info" onClick={handleStartCoinCount} value={1}>Next&#10095;</Button>
    </SectionFoot>
    </>
  )
}

function CoinList(props) {
  return (
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
  );
};
