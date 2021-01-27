import React, {useEffect, useState} from 'react';
import ExchangeHeader from './components/ExchangeHeader/ExchangeHeader';
import AccountBalance from './components/AccountBalance/AccountBalance';
import CoinList from './components/CoinList/CoinList';
import styled from 'styled-components';
import axios from 'axios';

const Div = styled.div`
  text-align: center;
  background-color: #1f3ea3;
  color: #cccccc;
`;

const COIN_COUNT = 10;
const coinsUrl = 'https://api.coinpaprika.com/v1/coins';
const tickersUrl = 'https://api.coinpaprika.com/v1/tickers/';

const formatPrice = price => parseFloat(Number(price).toFixed(4));

function App() {
  // This is use-state hooks
  const [balance, setBalance] = useState(10000);
  const [showBalance, setShowBalance] = useState(true);
  const [coinData, setCoinData] = useState([]);

  const componentDidMount = async() => {
    // Retrieve ticker from coinpaprika
    const response = await axios.get(coinsUrl)
    let coinIDs = response.data.slice(0, COIN_COUNT).map(coin => coin.id);

    // Retrieve prices from coinpaprika
    const promises = coinIDs.map(id => axios.get(tickersUrl + id));
    const responses = await Promise.all(promises);
    const coinData = responses.map(function(response){
      const coin = response.data;
      return {
        key: coin.id,
        name: coin.name,
        ticker: coin.symbol,
        balance: 0,
        price: formatPrice(coin.quotes.USD.price),
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

  const handleRefresh = async(tickerID) => {
    const tickerUrl = tickersUrl + tickerID;
    const response = await axios.get(tickerUrl);
    const newPrice = formatPrice(response.data.quotes.USD.price);
    debugger
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
        handleBalanceVisibility={handleBalanceVisibility}/>
      <CoinList 
        coinData={coinData} 
        handleRefresh={handleRefresh} 
        showBalance={showBalance}/>
    </Div>
  );
}

export default App;