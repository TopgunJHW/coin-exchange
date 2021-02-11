import React from 'react';
import styled from 'styled-components';
import { formatterCoin, formatter } from "../functions";
import { ButtonTable } from '../styledCSS';

const Td = styled.td`
    border: 1px solid #cccccc;
    width: 5vw;
`;

const TdName = styled(Td)`
    width: 15vw;
`;

const TdTicker = styled(Td)`
    width: 7vw;
`;

const TdCurrency = styled.td`
    border: 1px solid #cccccc;
    width: 7vw;
    text-align: right;
`;

const TdControls = styled(Td)`
    width: 20vw;
`;

export default function WalletCoin(props) {
   
    const handleRefresh = (event) => {
        // Prevent the default action of submitting the form
        event.preventDefault();
    };

    const handleBuy = (event) => {
        // Prevent the default action of submitting the form
        event.preventDefault();
        props.handleTransaction(true, props.tickerID);
    };

    const handleSell = (event) => {
        // Prevent the default action of submitting the form
        event.preventDefault();
        props.handleTransaction(false, props.tickerID);
    };

    var valueInUSD = props.priceUSD * props.balance;
    var valueInBTC = (props.priceOfBTC ? valueInUSD / props.priceOfBTC : 0);

    return (
        <tr>
            <TdName>{props.name}</TdName>
            <TdTicker>{props.ticker}</TdTicker>
            <TdCurrency>{props.showBalance ? 
                        formatterCoin.format(props.balance).toString() : 
                        '-'}</TdCurrency>
            <TdCurrency>{formatterCoin.format(valueInBTC)}</TdCurrency>
            <TdCurrency>{formatter.format(valueInUSD)}</TdCurrency>
            <TdControls>
                <form action="#" method="POST">
                    <ButtonTable className="btn btn-info" onClick={handleRefresh}>
                        <i className="fas fa-chart-line"></i> Graph
                    </ButtonTable>
                    <ButtonTable className="btn btn-success" onClick={handleBuy}>
                        Buy
                    </ButtonTable>
                    <ButtonTable className="btn btn-danger" onClick={handleSell}>
                        Sell
                    </ButtonTable>
                </form>
            </TdControls>
        </tr>
    );
};