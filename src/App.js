import React, { useEffect, useState } from 'react';
import { fetchGlobalInfo, fetchTickerInfo, findObject } from './components/functions'
import ExchangeHeader from './components/ExchangeHeader/ExchangeHeader';
import NavBar from './components/NavBar/NavBar';
import Market from './components/Market/Market'
import Wallet from './components/Wallet/Wallet';
import Graph from './components/Graph/Graph'
import styled from 'styled-components';

// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/flatly/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/all';

const Div = styled.div`
  text-align: center;
  background-color: #efefef;
  color: black;
`;

const helicopterAmount = 10000;
const globalUrl = 'https://api.coinpaprika.com/v1/global';
const tickersUrl = 'https://api.coinpaprika.com/v1/tickers/';

function App() {
  // This is use-state hooks
  const [balance, setBalance] = useState(10000);
  const [showBalance, setShowBalance] = useState(false);
  const [globalData, setGlobalData] = useState({});
  const [coinData, setCoinData] = useState([]);
  const [coinCount, setCoinCount] = useState(10);
  const [startCoinCount, setStartCoinCount] = useState(0);
  const [coinHoldings, setCoinHoldings] = useState([
          {key: 'btc-bitcoin', name:'Bitcoin', ticker:'BTC', balance: 0, priceUSD: null}, 
          {key: 'eth-ethereum', name:'Ethereum', ticker:'ETH', balance: 0, priceUSD: null}]);
  const [priceOfBTC, setPriceOfBTC] = useState(0);

  async function fetchCreateCoinData (count, startCount) {
    const fetchedCoinData = await fetchTickerInfo(count, startCount, tickersUrl);
    const newCoinData = fetchedCoinData.map(function(fetchedCoin){
      return {
        key: fetchedCoin.id,
        name: fetchedCoin.name,
        ticker: fetchedCoin.symbol,
        price: fetchedCoin.quotes.USD.price,
        marketCap: fetchedCoin.quotes.USD.market_cap,
        rank: fetchedCoin.rank
      }
    });
    return newCoinData
  }

  async function fetchCreateGlobalData () {
    const fetchedData = await fetchGlobalInfo(globalUrl);

    return {
      marketCap: fetchedData.market_cap_usd,
      dailyVol: fetchedData.volume_24h_usd,
      domBTC: fetchedData.bitcoin_dominance_percentage
    }
  }

  const refreshData = async(count, startCount) => {
    console.log("RefreshData")
    const responseCoinData = await fetchCreateCoinData(count, startCount);
    const responseGlobalData = await fetchCreateGlobalData();
    setCoinData(responseCoinData);
    setGlobalData(responseGlobalData); 
    setPriceOfBTC(findObject(responseCoinData, 'key', 'btc-bitcoin').price);
  };

  useEffect(function () {
    
    if (coinData.length === 0) {
      console.log('UseEffect')
      // In componentDidMount situation
      refreshData(coinCount, startCoinCount);
    } else {
      // In componentDidUpdate situation
    }
  })

  const handleRefresh = () => {
    console.log('handleRefresh')
    refreshData(coinCount, startCoinCount);
  }

  const handleCoinCount = (count) => {
    console.log('handleCoinCount')
    refreshData(count, startCoinCount);
    setCoinCount(count);
  };

  const handleStartCoinCount = (startCount) => {
    console.log('handleCoinCount')
    refreshData(coinCount, startCount);
    setStartCoinCount(startCount);
  }

  const handleBalanceVisibility = () => {
    setShowBalance(oldValue => !oldValue)
  }
  
  const handleHelicopterMoney = () => {
    setBalance(balance + helicopterAmount)
  }

  const handleTransaction = (isBuy, tickerKey) => {
    const coinInfo = findObject(coinData, 'key', tickerKey);
    var balanceChange = isBuy ? 1 : -1;
    let holdings = [...coinHoldings]; // This is shallow copy of the values

    if (!findObject(coinHoldings, 'key', tickerKey)){
      holdings = [...coinHoldings, {
        key: tickerKey,
        name: coinInfo.name,
        ticker: coinInfo.ticker,
        balance: 0,
        priceUSD: null}]
    };

    let newHoldings = holdings.map(function(holding){
      let newHolding = {...holding}; // This is shallow copy of the values
      if(tickerKey === holding.key){
        newHolding.balance += balanceChange;
        newHolding.priceUSD = coinInfo.price;
        setBalance(oldBalance => oldBalance - balanceChange * coinInfo.price);
      }
      return newHolding;
    });
    setCoinHoldings(newHoldings);
  }

  return (
    <Div>
      <ExchangeHeader />
      <NavBar />
      <Market 
        globalData={globalData}
        coinData={coinData}
        coinHoldings={coinHoldings}
        coinCount={coinCount}
        startCoinCount={startCoinCount}
        handleTransaction={handleTransaction}
        handleCoinCount={handleCoinCount}
        handleStartCoinCount={handleStartCoinCount}
        handleRefresh={handleRefresh}
        showBalance={showBalance}/>
      <Wallet 
        amount={balance} 
        coinHoldings={coinHoldings}
        priceOfBTC={priceOfBTC}
        showBalance={showBalance} 
        handleBalanceVisibility={handleBalanceVisibility}
        handleHelicopterMoney={handleHelicopterMoney}/>
      <Graph></Graph>
    </Div>
  );
}

export default App;