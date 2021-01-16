import React, { Component } from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

const Td = styled.td`
    border: 1px solid #cccccc;
    width: 25vh;
`;

export default class Coin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price: this.props.price
        };

        this.handleClick = this.handleClick.bind(this);
    };
    
    /*
    componentDidMount() {
        const callback = () => {
            // set state to a new random value
            const randomPercentage = 0.995 + Math.random() * 0.01;

            this.setState( function (oldstate) {
                return {
                    price: oldstate.price * randomPercentage
                };
            });
        };
        setInterval( callback , 1000);
    };
    */

    handleClick(event) {
        // Prevent the default action of submitting the form
        event.preventDefault();
        
        const randomPercentage = 0.995 + Math.random() * 0.01;
        this.setState( function (oldstate) {
            return {
                price: oldstate.price * randomPercentage
            };
        });
    };

    render(){
        return (
            <tr>
                <Td>{this.props.name}</Td>
                <Td>{this.props.ticker}</Td>
                <Td>${this.state.price}</Td>
                <Td>
                    <form action="#" method="POST">
                        <button onClick={this.handleClick}>Refresh</button>
                    </form>
                </Td>
            </tr>
        );
    };
};

Coin.propTypes = {
    name: propTypes.string.isRequired,
    ticker: propTypes.string.isRequired,
    price: propTypes.number.isRequired
};