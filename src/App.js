import React from 'react';
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

class App extends React.Component {
  state = {
    balance: 10000,
    showBalance: true,
    coinData: [
      // {
      //   name: 'Bitcoin',
      //   ticker: 'BTC',
      //   balance: 0.5,
      //   price: 9999.99
      // },
      // {
      //   name: 'Ethereum',
      //   ticker: 'ETH',
      //   balance: 32.0,
      //   price: 299.99
      // },
      // {
      //   name: 'Tether',
      //   ticker: 'USDT',
      //   balance: 0,
      //   price: 1.0
      // },
      // {
      //   name: 'Ripple',
      //   ticker: 'XRP',
      //   balance: 1000,
      //   price: 0.2
      // },
      // {
      //   name: 'Bitcoin Cash',
      //   ticker: 'BCH',
      //   balance: 0,
      //   price: 298.99
      // },
    ]
  }

  componentDidMount = async() => {
    // Retrieve ticker from coinpaprika
    const response = await axios.get('https://api.coinpaprika.com/v1/coins')
    let coinIDs = response.data.slice(0, COIN_COUNT).map(coin => coin.id);

    // Retrieve prices from coinpaprika
    const tickerUrl = 'https://api.coinpaprika.com/v1/tickers/';
    const promises = coinIDs.map(id => axios.get(tickerUrl + id));

    const responses = await Promise.all(promises);
    const coinData = responses.map(function(response){
      const coin = response.data;
      return {
        key: coin.id,
        name: coin.name,
        ticker: coin.symbol,
        balance: 0,
        price: parseFloat(Number(coin.quotes.USD.price).toFixed(4))
      };
    });

    // Set state
    this.setState({coinData});
  }; 

  handleBalanceVisibility = () => {
    this.setState( function(oldState){
      return {
        ...oldState,
        showBalance: !oldState.showBalance
      };
    });
  }

  handleRefresh = (refreshTicker) => {
    const newCoinData = this.state.coinData.map(function( values ) {
      let newValues = {...values}; // This is shallow copy of the values
      if(values.ticker === refreshTicker){
        const randomPercentage = 0.995 + Math.random() * 0.01;
        newValues.price *= randomPercentage;
      }
      return newValues;
    });
    this.setState({coinData: newCoinData})
  }

  render() {
    return (
      <Div>
        <ExchangeHeader />
        <AccountBalance 
          amount={this.state.balance} 
          showBalance={this.state.showBalance} 
          handleBalanceVisibility={this.handleBalanceVisibility}/>
        <CoinList 
          coinData={this.state.coinData} 
          handleRefresh={this.handleRefresh} 
          showBalance={this.state.showBalance}/>
      </Div>
    );
  }
  
}

export default App;
