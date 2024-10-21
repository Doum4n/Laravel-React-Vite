import { Outlet, Link, useNavigate } from "react-router-dom";
import { Nav, NavDropdown, NavItem, Row, Col, Button } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import {Container} from "react-bootstrap";
import { Offcanvas } from "react-bootstrap";
import React, { useState } from 'react';
import { signInWithPopup } from "firebase/auth";
import {Image} from "react-bootstrap";
import {auth} from '../config/firebase'
import { GoogleProvider } from "../config/firebase";

const Layout = () => {

  const [show, setShow] = useState();

  const HandlerShow = () => setShow(true);
  const HandlerClose = () => setShow(false);

  const SignInWithGoogle = async () => {
    try{
      await signInWithPopup(auth, GoogleProvider);
    }catch(e){
      console.error(e);
    }
  }

  const navigate = useNavigate();
  const AccountHandler = () => {
    navigate('/account');
  }

  return (
    <>
    <Container fluid className="mt-2">
      <Row>
        <Col sm="auto" className="d-flex align-items-center">
        <Image src={'./###'} style={{maxWidth: '50px'}} className="mb-2"/>
        <font size='3' className="m-2">
          slogan
        </font>
        </Col>

        <Col className="d-flex align-items-center justify-content-end">
          <Button className="bg-dark border-0" onClick={AccountHandler}>
            Account
          </Button>
        </Col>
      </Row>
      <Navbar bg="light" className="border rounded mb-3">
            <Navbar.Collapse>
            <Nav>
              <Nav.Link href="#home">Home</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavItem>
                    item
                  </NavItem>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
    </Navbar>
    </Container>
    <Outlet />
  </>
  )
};

export default Layout;
