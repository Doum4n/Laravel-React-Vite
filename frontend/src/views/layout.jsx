import { Outlet, Link } from "react-router-dom";
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

  return (
    <>
    <Container fluid className="mt-2">
      <Row>
        <Col sm="auto" className="d-flex align-items-center">
        <Image src={'../img/logo.png'} style={{maxWidth: '50px'}} className="mb-2"/>
        <font size='3' className="m-2">
          slogan
        </font>
        </Col>

        <Col className="d-flex align-items-center justify-content-end">
          <Button className="bg-dark border-0" onClick={SignInWithGoogle}>
            Account
          </Button>
        </Col>
      </Row>
    <Navbar bg="light" className="border rounded">
      {/* <Container fluid> */}
        {/* <Row className="w-100"> */}
          {/* Cột chứa nút Offcanvas và thương hiệu */}
          {/* <Col xs="auto" className="d-flex align-items-center"> */}
            {/* <Button onClick={HandlerShow} className="ms-2 me-2">
              =
            </Button> */}

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Offcanvas show={show} onHide={HandlerClose} placement="top" style={{top: '90px'}}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Title</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                Some text
              </Offcanvas.Body>
            </Offcanvas>

            {/* <Navbar.Brand href="#">brand</Navbar.Brand> */}
          {/* </Col> */}

          {/* Cột chứa các liên kết điều hướng */}
          {/* <Col> */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
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
          {/* </Col> */}

          {/* Cột chứa nút Account */}
          {/* <Col xs="auto" className="d-flex justify-content-end align-items-center"> */}
           
          {/* </Col> */}
        {/* </Row> */}
      {/* </Container> */}
    </Navbar>
    </Container>
    <Outlet />
  </>
  )
};

export default Layout;
