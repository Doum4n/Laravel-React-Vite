import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Post = ({ id, title, image, description }) => {

    const navigate = useNavigate();
    const PostHandler = () => {
        navigate(`/post/${id}`);
    }

    return (
        <div onClick={PostHandler} style={{position: 'relative', left: '200px'}}>
            <img src={image} alt={title} className="img-fluid" style={{width: '200px'}}/>
            <h2 className="post-title">{title}</h2>
            <p className="post-description">{description}</p>
        </div>
    );
};

export default Post;
