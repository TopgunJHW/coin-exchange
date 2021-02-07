import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { formatter, formatterMarketCap, formatterCoin } from "../functions";
import {ButtonTable} from '../styledButtons';

const Td = styled.td`
    border: 1px solid #cccccc;
    width: 5vw;
`;

const TdName = styled(Td)`
    width: 15vw;
`;

const TdTicker = styled(Td)`
    width: 10vw;
`;

const TdCurrency = styled.td`
    border: 1px solid #cccccc;
    width: 10vw;
    text-align: right;
`;

const TdControls = styled(Td)`
    width: 20vw;
`;

export default function Coin(props) {
   
    const handleRefresh = (event) => {
        // Prevent the default action of submitting the form
        event.preventDefault();
        // props.handleRefresh(props.tickerID);
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

    return (
        <tr>
            <Td>{props.rank + 1}</Td>
            <TdName>{props.name}</TdName>
            <TdTicker>{props.ticker}</TdTicker>
            <TdCurrency>{formatterMarketCap.format(props.marketCap)}</TdCurrency>
            <TdCurrency>{formatter.format(props.price)}</TdCurrency>
            <TdCurrency>{props.showBalance ? 
                        formatterCoin.format(props.balance).toString() : 
                        '-'}</TdCurrency>
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

Coin.propTypes = {
    name: propTypes.string.isRequired,
    ticker: propTypes.string.isRequired,
    price: propTypes.number.isRequired
};