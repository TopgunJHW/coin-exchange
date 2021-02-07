import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import {formatter} from "../functions";
import {Button} from '../styledButtons';

export const Section = styled.section`
    margin: 0.5rem 0 2rem 2.5rem;    
    font-size: 1rem;
    text-align: left;
    line-height: 3rem;
`;

const Balance = styled.div`
    min-width: 250px;
    margin: 0.5rem 0 0 2.5rem;
    font-size: 1.5rem;
    vertical-align: middle;
    text-align: left;
`;

export default function AccountBalance(props) {

    const buttonClass = 'btn ' + (props.showBalance ? 'btn-warning' : 'btn-info');
    const buttonText = props.showBalance ? ' Hide Balance' : ' Show Balance';
    const buttonIcon = props.showBalance ? 'fas fa-eye-slash' : 'fas fa-eye';
    let content = '\u00A0'; // Placeholder for content. Ensure no flipping when hiding and showing balance.
    if (props.showBalance) {
        content = <React.Fragment> Balance: {formatter.format(props.amount)} </React.Fragment>;
    };
    
    return (
        <>
            <Balance>{content}</Balance>
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
                <Button 
                    className="btn btn-info"
                    onClick={props.handleRefresh}>
                    <i className="fas fa-redo"></i> Refresh Price
                </Button>
            </Section>
        </>
    );
};

AccountBalance.propTypes = {
    amount: propTypes.number.isRequired
};