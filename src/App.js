import React, {useEffect, useState} from 'react';
import ExchangeHeader from './components/ExchangeHeader/ExchangeHeader';
import AccountBalance from './components/AccountBalance/AccountBalance';
import CoinList from './components/CoinList/CoinList';
import styled from 'styled-components';
import axios from 'axios';
import {SortArrayOfObjects} from './components/functions'

// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/flatly/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/all';

const Div = styled.div`
  text-align: center;
  background-color: #1f3ea3;
  color: #cccccc;
`;

const COIN_COUNT = 100;
const tickersUrl = 'https://api.coinpaprika.com/v1/tickers/';

function App() {
  // This is use-state hooks
  const [balance, setBalance] = useState(10000);
  const [showBalance, setShowBalance] = useState(false);
  const [coinData, setCoinData] = useState([]);

  const componentDidMount = async() => {
    // // Retrieve ticker from coinpaprika
    // const response = await axios.get(coinsUrl)
    // let coinIDs = response.data.slice(0, COIN_COUNT).map(coin => coin.id);

    // // Retrieve prices from coinpaprika
    // const promises = coinIDs.map(id => axios.get(tickersUrl + id));
    // const responses = await Promise.all(promises);
    // const coinData = responses.map(function(response){
    //   const coin = response.data;
    //   return {
    //     key: coin.id,
    //     name: coin.name,
    //     ticker: coin.symbol,
    //     balance: 0,
    //     price: coin.quotes.USD.price,
    //   };
    // });
    // setCoinData(coinData);

    const response = await axios.get(tickersUrl);
    const sortedResponse = SortArrayOfObjects(response.data);
    const slicedResponse = sortedResponse.slice(0, COIN_COUNT);
    const coinData = slicedResponse.map(function(coin){
      return {
        key: coin.id,
        name: coin.name,
        ticker: coin.symbol,
        balance: 0,
        price: coin.quotes.USD.price,
        marketCap: coin.quotes.USD.market_cap
      };
    });
    setCoinData(coinData);
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
    setBalance(balance + 1000)
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

  const handleRefresh = async(tickerID) => {
    const tickerUrl = tickersUrl + tickerID;
    const response = await axios.get(tickerUrl);
    const newPrice = response.data.quotes.USD.price;
    const newCoinData = coinData.map( coin => {
      let newCoin = {...coin}; // This is shallow copy of the values
      if(coin.key === tickerID){
        newCoin.price = newPrice;
      };
      return newCoin;
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
        handleHelicopterMoney={handleHelicopterMoney}/>
      <CoinList 
        coinData={coinData} 
        handleRefresh={handleRefresh}
        handleTransaction={handleTransaction}
        showBalance={showBalance}/>
    </Div>
  );
}

export default App;