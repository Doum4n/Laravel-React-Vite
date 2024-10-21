import { Container, FormControl, FormGroup, InputGroup } from "react-bootstrap"
import React from "react";
import Button from 'react-bootstrap/Button';
import {auth} from '../config/firebase'
import { GoogleProvider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";

const Login = () => {

    const navigate = useNavigate();
    const RegisterHandler = () => {
        navigate('/register');
    }

    const SignInWithGoogle = async () => {
        try{
            await signInWithPopup(auth, GoogleProvider);
        }catch(e){
            console.error(e);
        }
    }

    return (
        <>
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "100vh" }} // Đảm bảo căn giữa theo chiều dọc
            >
                <Card style={{ width: '300px' }} className="p-4"> {/* Thêm Card ở đây */}
                    <Form>
                        <FormGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Gmail</InputGroup.Text>
                                <FormControl 
                                    type="text"
                                    placeholder="Username"
                                    required
                                />
                            </InputGroup>
                            <Form.Control.Feedback type="invalid">
                                Looks good!
                            </Form.Control.Feedback>
                        </FormGroup>

                        <FormGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Password</InputGroup.Text>
                                <FormControl                 
                                    placeholder="Password"
                                    type="password"
                                    required
                                />
                            </InputGroup>
                            <Form.Control.Feedback type="invalid">
                                invalid
                            </Form.Control.Feedback>
                        </FormGroup>

                        <div className="text-end mb-3"> {/* Căn nút sang bên phải */}
                            <Button className="me-2" variant="primary" type="sublit">Sign in</Button>
                            <Button variant="outline-primary" onClick={RegisterHandler}>Sign up</Button>
                        </div>
                        <Button variant="link" className="w-100" onClick={SignInWithGoogle}>Sign in with google</Button>
                    </Form>
                </Card>
            </Container>
        </>
    );
}

export default Login;