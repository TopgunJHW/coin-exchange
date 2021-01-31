import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { formatter } from "../functions";

const Section = styled.section`
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
    line-height: 3rem 
    display: inline-block;
`;

const Balance = styled.div`
    min-width: 250px;
    margin: 0.5rem 0 0 2.5rem;
    font-size: 1.5rem;
    vertical-align: middle;
    text-align: left;
`;

const Button = styled.button`
    margin 0 8px;
`;

const BalanceToggleButton = styled(Button)`
    width 150px;
`;

export default function AccountBalance(props) {

    const buttonText = props.showBalance ? 'Hide Balance' : 'Show Balance';
    const buttonClass = 'btn ' + (props.showBalance ? 'btn-warning' : 'btn-info');
    let content = '\u00A0'; // Placeholder for content. Ensure no flipping when hiding and showing balance.
    if (props.showBalance) {
        content = <React.Fragment> Balance: {formatter.format(props.amount)} </React.Fragment>;
    };
    return (
        <>
            <Balance>{content}</Balance>
            <Section>
                <BalanceToggleButton 
                    className={buttonClass}
                    onClick={props.handleBalanceVisibility}>
                    {buttonText}
                </BalanceToggleButton>
                <Button 
                    className="btn btn-success"
                    onClick={props.handleHelicopterMoney}>
                    <i className="fas fa-helicopter"></i>
                </Button>
            </Section>
        </>
    );
};

AccountBalance.propTypes = {
    amount: propTypes.number.isRequired
};