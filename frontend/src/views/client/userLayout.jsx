import { Outlet, Link, useNavigate } from "react-router-dom";
import { Nav, NavDropdown, NavItem, Row, Col, Button, Dropdown, Card, Modal } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Offcanvas } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import { signInWithPopup, signOut } from "firebase/auth";
import { Image } from "react-bootstrap";
import { auth } from '../../config/firebase'
import { GoogleProvider } from "../../config/firebase";
import img from '../../assets/user.png';

const Layout = () => {

  const [login, setLogin] = useState(false);
  const [userPhoto, setUserPhoto] = useState(null);

  const [show, setShow] = useState(false)
  const showModal = () => setShow(true);
  const closeModal = () => setShow(false);

  useEffect(() => {
    try {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          setUserPhoto(user.photoURL);
          setLogin(true);
          console.log(user.photoURL);
        } else {
          setUserPhoto(img);
          setLogin(false);
        }
      });
    } catch (err) {
      console.error(err);
    };
  });

  const navigate = useNavigate();
  const LoginHandler = () => {
    navigate('/login');
  }

  const PostHandler = () => {
    navigate('/post/upload');
  }

  const LogOut = async () => {
    await signOut(auth);
    closeModal();
    navigate('/home');
  }

  return (
    <>
      <Container className="mt-2">
        <Navbar bg="light" className="border-0 bg-white mb-3">
          <Navbar.Collapse>
            <Navbar.Brand className="ms-3" onClick={() => navigate('/home')}>
              LOGO
            </Navbar.Brand>
            <input className="rounded-4 border-1"></input>
          </Navbar.Collapse>
          <Button className="me-2" onClick={PostHandler}>
            Post
          </Button>
          {
            <Card className="p-2 rounded-5 me-3">
              <div className="d-flex align-items-center justify-content-between">
                <Image src={userPhoto} style={{ width: '50px' }} className="me-2" roundedCircle />
                {/* Thêm nội dung nếu cần ở đây */}
                <Dropdown style={{ float: 'right' }} drop="">
                  <Dropdown.Toggle className="bg-white border-0 text-dark" id="dropdown-basic" />
                  <Dropdown.Menu>
                    {login &&
                      <div>
                        <Dropdown.Item onClick={() => navigate('/account')}>Account</Dropdown.Item>
                        <Dropdown.Item onClick={showModal}>Log out</Dropdown.Item>
                      </div>}
                    {!login &&
                      <div>
                        <Dropdown.Item onClick={() => navigate('/login')}>Login</Dropdown.Item>
                        <Dropdown.Item onClick={() => navigate('/register')}>Log up</Dropdown.Item>
                      </div>
                    }
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Card>}
        </Navbar>
        <Modal
          show={show}
          onHide={closeModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Warning!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Do you want to Log out?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={LogOut}>Yes</Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <Outlet />
    </>
  )
};

export default Layout;
