import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { Button, Container, Form } from "react-bootstrap";
import Comment from "../component/comment";
import {Node, Tree} from "../component/TreeComment"

const Post = () => {

    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [photoUrl, setUrl] = useState([]);
    const [comments, setComments] = useState([]);

    const {id} = useParams();

    fetch(`http://0.0.0.0/get-post/${id}`)
    .then(response => {
        if (!response.ok) {
        throw new Error('Cant get post');
        }
        return response.json(); // Chuyển đổi dữ liệu JSON từ response
    })
    .then(data => {
        setContent(data.post.content);
        setTitle(data.post.title);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

    // const getComments = async (comment_id) => {
        fetch(`http://0.0.0.0/get/commentByPostId/26`)
        .then(response => {
            if(!response.ok){
                throw new Error('Cant get comments');
            }
            return response.json();
        }).then(data => {
            setComments(data);
        }).catch(error => {
            console.Error(error);
        });
    // }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://0.0.0.0/get-image/${id}`);
                if (!response.ok) {
                    throw new Error('Cant get image');
                }
                const data = await response.json();
                setUrl(data.url); // Gán mảng URL vào state
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };
        fetchData();
    }, [id]);

    const addToTree = (comment) => {
        let root = new Tree(comment.id, comment.content);
        for(let childComment of comment.children){
            root.insert(root, childComment.id, childComment.content);
            childComment.parent = root;
        }
    }
    

    return (
        <Container>
            <h1>
                {title}
            </h1>
            <br/>
            <div dangerouslySetInnerHTML={{ __html: content }} />           
            <br/>
            <div>
                {photoUrl.map((url, index) => (
                    <img key={index} src={`http://0.0.0.0${url}`} alt={`Image ${index}`} />
                ))}
            </div>
            <Form className="mt-3">
                <Form.Group>
                    <Form.Control as='textarea' rows={3} placeholder="Comment..."></Form.Control>
                </Form.Group>
                <div className="d-flex justify-content-end mt-3">
                    <Button>Send</Button>
                </div>
            </Form>

            <div>
                <Comment 
                    nameUser="User" 
                    ImageSrc="http://0.0.0.0/storage/images/piLImcuVtFrAne46IjKye6B8PCtNtO5CKyGGqfTE.png"
                    comment="Comment"
                ></Comment>
            </div>


        </Container>
    )
}

export default Post