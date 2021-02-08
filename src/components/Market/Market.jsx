import React from 'react'
import CoinList from './CoinList';
import styled from 'styled-components';
import { Button } from '../styledButtons';
import { formatterMarketCap} from '../functions';

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

export default function Market (props) {
  
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
        <Div>Market Cap: {formatterMarketCap.format(props.globalData.marketCap)}</Div>
        <Div>24h Vol: {formatterMarketCap.format(props.globalData.dailyVol)}</Div>
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