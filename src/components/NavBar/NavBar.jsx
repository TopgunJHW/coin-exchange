import React from 'react';
import styled from 'styled-components';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const Navbar1 = styled(Navbar)`
    background-color: white;
    border-top: 1px solid grey;
    border-bottom: 1px solid grey;
    height: 3rem;
`;

export default function NavBar(props) {

    return (
        <Navbar1 bg="" variant="light">
            <Navbar.Brand href="#home">Home</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#Market">Market</Nav.Link>
                <Nav.Link href="#holdings">Holdings</Nav.Link>
                <Nav.Link href="#graph">Graph</Nav.Link>
            </Nav>
        </Navbar1>

    );
};