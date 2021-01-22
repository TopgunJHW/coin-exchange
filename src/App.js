import React from 'react';
import ExchangeHeader from './components/ExchangeHeader/ExchangeHeader';
import AccountBalance from './components/AccountBalance/AccountBalance';
import CoinList from './components/CoinList/CoinList';
import styled from 'styled-components';

const Div = styled.div`
  text-align: center;
  background-color: #1f3ea3;
  color: #cccccc;
`;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      balance: 10000,
      showBalance: true,
      coinData: [
        {
          name: 'Bitcoin',
          ticker: 'BTC',
          balance: 0.5,
          price: 9999.99
        },
        {
          name: 'Ethereum',
          ticker: 'ETH',
          balance: 32.0,
          price: 299.99
        },
        {
          name: 'Tether',
          ticker: 'USDT',
          balance: 0,
          price: 1.0
        },
        {
          name: 'Ripple',
          ticker: 'XRP',
          balance: 1000,
          price: 0.2
        },
        {
          name: 'Bitcoin Cash',
          ticker: 'BCH',
          balance: 0,
          price: 298.99
        },
      ]
    }
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleBalanceVisibility = this.handleBalanceVisibility.bind(this);
  }

  handleBalanceVisibility(){
    this.setState( function(oldState){
      return {
        ...oldState,
        showBalance: !oldState.showBalance
      };
    });
  }

  handleRefresh(refreshTicker) {
    const newCoinData = this.state.coinData.map(function({ticker, name, price, balance}) {
      let newPrice = price;
      if(ticker === refreshTicker){
        const randomPercentage = 0.995 + Math.random() * 0.01;
        newPrice = newPrice * randomPercentage;
      }
      return {
        ticker,
        name,
        price: newPrice,
        balance
      };
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
