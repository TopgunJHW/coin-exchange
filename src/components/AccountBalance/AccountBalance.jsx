import React, { Component } from 'react';
import propTypes from 'prop-types';
import './AccountBalance.css'

export default class AccountBalance extends Component {
    render() {
        return (
            <section className="accountBalanceCSS">
                ${this.props.amount}
            </section>
        )
    }
}

AccountBalance.propTypes = {
    amount: propTypes.number.isRequired
};