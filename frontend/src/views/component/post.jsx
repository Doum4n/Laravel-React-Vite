import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Post = ({ id, title, image, description }) => {

    const navigate = useNavigate();
    const PostHandler = () => {
        navigate(`/post/${id}`);
    }

    return (
        <div className="post-card" onClick={PostHandler}>
        <img src={image} alt={title} className="img-fluid"/>
        <h2 className="post-title">{title}</h2>
        <p className="post-description">{description}</p>
        </div>
    );
};

export default Post;
