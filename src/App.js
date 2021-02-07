import React, { useEffect, useState } from 'react';
import { fetchTickerInfo, findObject } from './components/functions'
import ExchangeHeader from './components/ExchangeHeader/ExchangeHeader';
import NavBar from './components/NavBar/NavBar';
import AccountBalance from './components/AccountBalance/AccountBalance';
import CoinList from './components/CoinList/CoinList';
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
const tickersUrl = 'https://api.coinpaprika.com/v1/tickers/';

function App() {
  // This is use-state hooks
  const [balance, setBalance] = useState(10000);
  const [showBalance, setShowBalance] = useState(false);
  const [coinData, setCoinData] = useState([]);
  const [coinCount, setCoinCount] = useState(10)
  const [coinHoldings, setCoinHoldings] = useState([])

  async function fetchCreateCoinData (count) {
    const fetchedCoinData = await fetchTickerInfo(count, tickersUrl);
    const newCoinData = fetchedCoinData.map(function(fetchedCoin){
      const coin = findObject(coinData, 'key', fetchedCoin.id);
      
      if (coin === undefined) {
        return {
          key: fetchedCoin.id,
          name: fetchedCoin.name,
          ticker: fetchedCoin.symbol,
          price: fetchedCoin.quotes.USD.price,
          marketCap: fetchedCoin.quotes.USD.market_cap
        }
      }
      else{
        let newCoin = {...coin}; // This is shallow copy of the values
        newCoin.price = fetchedCoin.quotes.USD.price;
        newCoin.marketCap = fetchedCoin.quotes.USD.market_cap;
        return newCoin;
      };
    });
    return newCoinData
  }

  const componentDidMount = async() => {
    setCoinData(await fetchCreateCoinData(coinCount));
  };

  useEffect(function () {
    if (coinData.length === 0) {
      // In componentDidMount situation
      componentDidMount();
    } else {
      // In componentDidUpdate situation
    }
  })

  const handleRefresh = async() => {
    setCoinData(await fetchCreateCoinData(coinCount));
  }

  const handleCoinCount = async(value) => {
    setCoinData(await fetchCreateCoinData(value));
    setCoinCount(value);
  };

  const handleBalanceVisibility = () => {
    setShowBalance(oldValue => !oldValue)
  }
  
  const handleHelicopterMoney = () => {
    setBalance(balance + helicopterAmount)
  }

  const handleTransaction = (isBuy, tickerKey) => {
    const coinInfo = findObject(coinData, 'key', tickerKey);
    var balanceChange = isBuy ? 1 : -1;
    let holdings = [...coinHoldings];

    if (!findObject(coinHoldings, 'key', tickerKey)){
      holdings = [...coinHoldings, {key: tickerKey, balance: 0}]
    };

    let newHoldings = holdings.map(function(holding){
      let newHolding = {...holding};
      if(tickerKey === holding.key){
        newHolding.balance += balanceChange;
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
      <AccountBalance 
        amount={balance} 
        showBalance={showBalance} 
        handleBalanceVisibility={handleBalanceVisibility}
        handleHelicopterMoney={handleHelicopterMoney}
        handleRefresh={handleRefresh}/>
      <CoinList 
        coinData={coinData}
        coinHoldings={coinHoldings}
        handleTransaction={handleTransaction}
        handleCoinCount={handleCoinCount}
        showBalance={showBalance}/>
    </Div>
  );
}

export default App;