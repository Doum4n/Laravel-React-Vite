import { Outlet, Link, useNavigate } from "react-router-dom";
import { Nav, NavDropdown, NavItem, Row, Col, Button } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import {Container} from "react-bootstrap";
import { Offcanvas } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import { signInWithPopup } from "firebase/auth";
import {Image} from "react-bootstrap";
import {auth} from '../config/firebase'
import { GoogleProvider } from "../config/firebase";

const Layout = () => {

  const [login, setLogin] = useState(false);
  const [userPhoto, setUserPhoto] = useState(null);

  useEffect(() => {
    try{
      auth.onAuthStateChanged(function(user){
        if(user){
          setUserPhoto(user.photoURL);
          setLogin(true);
        }else{
          setLogin(false);
        }
      });
    }catch(err){
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

  return (
    <>
    <Container fluid className="mt-2">
      <Navbar bg="light" className="border rounded mb-3">
            <Navbar.Collapse>
              <Navbar.Brand className="ms-3">
                LOGO
              </Navbar.Brand>
              <input className="rounded-4 border-1"></input>
            </Navbar.Collapse>
            <Button className="me-2" onClick={PostHandler}>
              Post
            </Button>
            { !login && <Button className="bg-dark border-0 me-2" onClick={LoginHandler}>
            Login
          </Button>}
            { login && 
              <Image src={userPhoto} style={{width: '50px'}} className="me-2" onClick={() => navigate('/account')} roundedCircle/>
            }
    </Navbar>
    </Container>
    <Outlet />
  </>
  )
};

export default Layout;
