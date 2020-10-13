import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaCogs } from "react-icons/fa";
import './TopNavBar.css';

const TopNavBar = ({ handleShowDRMConfig }: any) => {
        return (
            <Navbar sticky="top" style={styles.nav} variant="dark">
                <Navbar.Brand href="http://verimatrix.com/">
                    <img
                        width="230"
                        height="80"
                        src="/vmx_logo.png"
                        className="d-inline-block align-top"
                        alt="Verimatrix Logo"
                    />
                </Navbar.Brand>
                <Navbar.Brand as={Link} to={"/"}>
                    Multirights DRM Player
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <FaCogs onClick={() => handleShowDRMConfig()} size="2rem" className="icon"/>
                    <Nav.Link as={Link} to="/contents">Content</Nav.Link>
                    <Nav.Link as={Link} to="/">New Content</Nav.Link>
                </Nav>
            </Navbar>
        );
}

const styles = {
    nav: {
        backgroundColor: 'black',
    }
};

export default TopNavBar;
