import {useState} from "react";
import Search from "./Search";
import logo from '../logo.svg';
import '../App.css'

import {Nav, Navbar, NavbarBrand} from "react-bootstrap";
import {GoSearch} from 'react-icons/go'
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import NavbarToggle from "react-bootstrap/NavbarToggle";

/**
 * Renders navigation bar
 * @returns {JSX.Element}
 * @constructor
 */
const Navigation = () => {

    const [show, setShow] = useState(false);

    return(
        <Navbar collapseOnSelect expand="sm" bg="myBlack" variant="dark" fixed="top">
            <NavbarBrand href="/">
                <img src={logo} width="40px" height="40px" alt="logo"/>{' '}
                ReactApp
            </NavbarBrand>

            <NavbarToggle/>
            <NavbarCollapse aria-controls="gamesDrop" style={{background:"#212529!important"}}>
                <Nav className="me-auto">
                    <Nav.Link href={`/game/all`}>Games</Nav.Link>
                    <Nav.Link href="/platform">Platforms</Nav.Link>
                    <Nav.Link href={'/exgame'}>Example Game</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link eventKey="disabled"  onClick={() => setShow(true)}>Search <GoSearch/></Nav.Link>
                    <Search show={show} onHide={() => setShow(false)}/>
                </Nav>
            </NavbarCollapse>
        </Navbar>
    )

}
export default Navigation;

