import React, {useEffect, useState} from 'react';
import ExchangeHeader from './components/ExchangeHeader/ExchangeHeader';
import AccountBalance from './components/AccountBalance/AccountBalance';
import CoinList from './components/CoinList/CoinList';
import styled from 'styled-components';
import {fetchTickerInfo} from './components/functions'

// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/flatly/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/all';

const Div = styled.div`
  text-align: center;
  background-color: #efefef;
  color: black;
`;

const helicopterAmount = 10000;
const tickersUrl = 'https://api.coinpaprika.com/v1/tickers/';

function App() {
  // This is use-state hooks
  const [balance, setBalance] = useState(10000);
  const [showBalance, setShowBalance] = useState(false);
  const [coinData, setCoinData] = useState([]);
  const [coinCount, setCoinCount] = useState(10)

  const componentDidMount = async() => {
    const slicedResponse = await fetchTickerInfo(coinCount, tickersUrl);
    const newCoinData = slicedResponse.map(function(coin){
      return {
        key: coin.id,
        name: coin.name,
        ticker: coin.symbol,
        balance: 0,
        price: coin.quotes.USD.price,
        marketCap: coin.quotes.USD.market_cap
      };
    });
    setCoinData(newCoinData);
  };

  const handleRefresh = async() => {
    const slicedResponse = await fetchTickerInfo(coinCount, tickersUrl);
    const newCoinData = slicedResponse.map(function(responseCoin){
      const coin = coinData.find(coin => coin.key === responseCoin.id);
      
      if (coin === undefined) {
        return {
          key: responseCoin.id,
          name: responseCoin.name,
          ticker: responseCoin.symbol,
          balance: 0,
          price: responseCoin.quotes.USD.price,
          marketCap: responseCoin.quotes.USD.market_cap
        }
      }
      else{
        let newCoin = {...coin}; // This is shallow copy of the values
        newCoin.price = responseCoin.quotes.USD.price;
        newCoin.marketCap = responseCoin.quotes.USD.market_cap;
        return newCoin;
      };
    });
    setCoinData(newCoinData);
  }

  const handleCoinCount = async(value) => {
    const slicedResponse = await fetchTickerInfo(value, tickersUrl);
    const newCoinData = slicedResponse.map(function(responseCoin){
      const coin = coinData.find(coin => coin.key === responseCoin.id);
      
      if (coin === undefined) {
        return {
          key: responseCoin.id,
          name: responseCoin.name,
          ticker: responseCoin.symbol,
          balance: 0,
          price: responseCoin.quotes.USD.price,
          marketCap: responseCoin.quotes.USD.market_cap
        }
      }
      else{
        let newCoin = {...coin}; // This is shallow copy of the values
        newCoin.price = responseCoin.quotes.USD.price;
        newCoin.marketCap = responseCoin.quotes.USD.market_cap;
        return newCoin;
      };
    });
    setCoinData(newCoinData);
    setCoinCount(value);
  };

  useEffect(function () {
    if (coinData.length === 0) {
      // In componentDidMount situation
      componentDidMount();
    } else {
      // In componentDidUpdate situation
    }
  })

  const handleBalanceVisibility = () => {
    setShowBalance(oldValue => !oldValue)
  }
  
  const handleHelicopterMoney = () => {
    setBalance(balance + helicopterAmount)
  }

  const handleTransaction = (isBuy, tickerID) => {
    var balanceChange = isBuy ? 1 : -1;
    const newCoinData = coinData.map(function (coin) {
      let newCoin = {...coin};
      if(tickerID === coin.key){
        newCoin.balance += balanceChange;
        setBalance(oldBalance => oldBalance - balanceChange * coin.price);
      }
      return newCoin
    });
    setCoinData(newCoinData);
  }

  return (
    <Div>
      <ExchangeHeader />
      <AccountBalance 
        amount={balance} 
        showBalance={showBalance} 
        handleBalanceVisibility={handleBalanceVisibility}
        handleHelicopterMoney={handleHelicopterMoney}
        handleRefresh={handleRefresh}/>
      <CoinList 
        coinData={coinData} 
        handleTransaction={handleTransaction}
        handleCoinCount={handleCoinCount}
        showBalance={showBalance}/>
    </Div>
  );
}

export default App;