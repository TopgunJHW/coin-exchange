import React from 'react';
import logo from './logo.svg';
import './App.css';
import Coin from './components/Coin/Coin';
import AccountBalance from './components/AccountBalance/AccountBalance';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      balance: 10000,
      coinData: [
        {
          name: 'Bitcoin',
          ticker: 'BTC',
          price: 9999.99
        },
        {
          name: 'Ethereum',
          ticker: 'ETH',
          price: 299.99
        },
        {
          name: 'Tether',
          ticker: 'USDT',
          price: 1.0
        },
        {
          name: 'Ripple',
          ticker: 'XRP',
          price: 0.2
        },
        {
          name: 'Bitcoin Cash',
          ticker: 'BCH',
          price: 298.99
        },
      ]
    }
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="React logo" className="App-logo"/>
          <h1 className="App-title">
            Coin Exchange
          </h1>
        </header>
        <AccountBalance amount={this.state.balance} />
        <table className="Coin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Ticker</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {
              // key values is needed for optimally rendering in react. 
              this.state.coinData.map( ({name, ticker, price}) =>
                <Coin key={ticker} name={name} ticker={ticker} price={price} />
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
  
}

export default App;
