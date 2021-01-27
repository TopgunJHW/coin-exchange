import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

const Td = styled.td`
    border: 1px solid #cccccc;
    width: 25vh;
`;

export default function Coin(props) {
   
    const handleClick = (event) => {
        // Prevent the default action of submitting the form
        event.preventDefault();
        props.handleRefresh(props.tickerID);
    };

    return (
        <tr>
            <Td>{props.name}</Td>
            <Td>{props.ticker}</Td>
            <Td>${props.price}</Td>
            {props.showBalance ? <Td>${props.balance}</Td> : null}
            <Td>
                <form action="#" method="POST">
                    <button onClick={handleClick}>Refresh</button>
                </form>
            </Td>
        </tr>
    );
};

Coin.propTypes = {
    name: propTypes.string.isRequired,
    ticker: propTypes.string.isRequired,
    price: propTypes.number.isRequired
};