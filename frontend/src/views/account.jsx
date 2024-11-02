import { Button, Modal } from "react-bootstrap";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Account = () => {

    const [show, setShow] = useState(false)
    const navigate = useNavigate();

    const LogOut = async () => {
        await signOut(auth);
        closeModal();
        navigate('/home');
    }

    const showModal = () => setShow(true);
    const closeModal = () => setShow(false);

    return (
        <>
        <div>
            <Button onClick={showModal}>
                Log out
            </Button>
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
        </div>
        </>
    );
}

export default Account