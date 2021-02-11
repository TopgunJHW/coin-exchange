import React from 'react';
import propTypes from 'prop-types';
import WalletList from './WalletList';
import styled from 'styled-components';
import { formatter } from '../functions';
import { H1, Button } from '../styledCSS';

const Div = styled.div`
    text-align: center;
    background-color: white;
    color: black;
`;

const DivWallet = styled(Div)`
    width: 63%;
    display: inline-block;

`;

export const Section = styled.section`
    margin: 0 0 0.5rem 0;    
    font-size: 1rem;
    text-align: left;
    line-height: 3rem;
`;

const Balance = styled.div`
    min-width: 250px;
    font-size: 1.5rem;
    vertical-align: middle;
    text-align: left;
`;

export const SectionFoot = styled(Section)`
  margin: 10px 0 3rem 0;
`;

export default function Wallet(props) {

    const buttonClass = 'btn ' + (props.showBalance ? 'btn-warning' : 'btn-info');
    const buttonText = props.showBalance ? ' Hide Balance' : ' Show Balance';
    const buttonIcon = props.showBalance ? 'fas fa-eye-slash' : 'fas fa-eye';
    let content = '\u00A0'; // Placeholder for content. Ensure no flipping when hiding and showing balance.
    if (props.showBalance) {
        content = <React.Fragment>{formatter.format(props.amount)}</React.Fragment>;
    };

    let contentCrypto = '\u00A0';
    let walletBalance = 0;
    if (props.showBalance) {
        walletBalance = props.coinHoldings.map(coin => (coin.balance * coin.priceUSD)).reduce((a, b) => a + b, 0);
        contentCrypto = <React.Fragment> {formatter.format(walletBalance)} </React.Fragment>;
    };
    
    return (
        <Div>
            <DivWallet>
            <H1>Wallet</H1>
            <Balance>Fiat Balance: {content}</Balance>
            <Balance>Wallet Balance: {contentCrypto}</Balance>
            <Section>
                <Button 
                    className="btn btn-success"
                    onClick={props.handleHelicopterMoney}>
                    <i className="fas fa-helicopter"></i>
                </Button>
                <Button 
                    className={buttonClass}
                    onClick={props.handleBalanceVisibility}>
                    <i className={buttonIcon}></i>
                    {buttonText}
                </Button>
            </Section>
            <WalletList
                coinHoldings={props.coinHoldings}
                priceOfBTC={props.priceOfBTC}
                showBalance={props.showBalance}/>
            <SectionFoot> </SectionFoot>
            </DivWallet>
        </Div>
    );
};

Wallet.propTypes = {
    amount: propTypes.number.isRequired
};