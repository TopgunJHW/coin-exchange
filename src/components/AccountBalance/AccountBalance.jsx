import React, { Component } from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

const Section = styled.section`
    font-size: 2rem;
    text-align: left;
    padding: 1.5rem 0 1.5rem 5rem
`;


export default class AccountBalance extends Component {

    render() {
        const buttonText = this.props.showBalance ? 'Hide Balance' : 'Show Balance';
        let content = null
        if (this.props.showBalance) {
            content = <React.Fragment> Balance: ${this.props.amount} </React.Fragment>;
        }
        return (
            <Section>
                {content}
                <button onClick={this.props.handleBalanceVisibility}> {buttonText} </button>
            </Section>
        )
    }
}

AccountBalance.propTypes = {
    amount: propTypes.number.isRequired
};