import React from 'react'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { BsHeart, BsPerson, BsFillHeartFill, BsFillPersonFill, BsCaretDown, BsCaretDownFill, BsThreeDotsVertical } from 'react-icons/bs'

function Header (){
    return (
        <Navbar sticky="top" expand>
            <Navbar.Brand href="">Usetuls</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <NavDropdown title="More" id="navbarScrollingDropdown" menuVariant="dark">
                        <NavDropdown.Item href="#action">Info</NavDropdown.Item>
                        <NavDropdown.Item href="#action">About</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action">Something else</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Container className="justify-content-end">
                    <Nav>
                        <Nav.Link><BsHeart /></Nav.Link>
                        <Nav.Link><BsPerson /></Nav.Link>
                    </Nav>
                </Container>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header