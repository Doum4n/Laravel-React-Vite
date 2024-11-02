import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';

const subPost = ({ id, title, image, description }) => {

    const navigate = useNavigate();
    const PostHandler = () => {
        navigate(`/post/${id}`);
    }

    return (
        <div onClick={PostHandler}>
            <Row>
                <hr/>
                <Col md={6}>
                    <h4 className="post-title">{title}</h4>
                    <p className="post-description">{description}</p>
                </Col>
                <Col>
                    <img src={image} alt={title} className="img-fluid"/>
                </Col>
            </Row>
        </div>
    );
};

export default subPost;
