import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { formatter, formatterMarketCap, formatterCoin } from "../functions";

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

const Button = styled.button`
    font-size: 11px;
    width: 64px;
    margin 3px 5px 0;
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
                    <Button className="btn btn-info" onClick={handleRefresh}>
                        Graph
                    </Button>
                    <Button className="btn btn-success" onClick={handleBuy}>
                        Buy
                    </Button>
                    <Button className="btn btn-danger" onClick={handleSell}>
                        Sell
                    </Button>
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