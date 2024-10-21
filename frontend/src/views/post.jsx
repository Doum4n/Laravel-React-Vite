import { useState } from "react";
import { useParams } from "react-router-dom";

const Post = () => {

    const [title, setName] = useState();
    const [content, setContent] = useState();
    const [photoUrl, setUrl] = useState();

    const {id} = useParams();

    fetch(`http://0.0.0.0/test-db/${id}`)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json(); // Chuyển đổi dữ liệu JSON từ response
    })
    .then(data => {
        setName(data.title);
        setContent(data.content);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });


    fetch(`http://0.0.0.0/image/${id}`)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json(); // Chuyển đổi dữ liệu JSON từ response
    })
    .then(data => {
        setUrl(data.url);
        console.log(`http:0.0.0.0${photoUrl}`);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

    return (
        <>
            {title}
            <br/>
            {content}
            <br/>
            <img src={`http://0.0.0.0${photoUrl}`}/>
        </>
    )
}

export default Post