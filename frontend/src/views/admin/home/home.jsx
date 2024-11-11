import { Col, Container, Row } from "react-bootstrap"
import NavBar from "../navbar/navbar"
import SideBar from "../sidebar/sidebar"
import './home.css'
import { useEffect, useState } from "react"

const AdminLayout = () => {

    const [users, setUsers] = useState();
    const [posts, setPosts] = useState();
    const [views, setView] = useState();
    const [likes, setLikes] = useState();
    const [comments, setComments] = useState();

    useEffect(() => {
        fetch('http://0.0.0.0/statistical')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setComments(data.comment_count);
                setLikes(data.like_count);
                setPosts(data.post_count);
                setView(data.view_count);
                setUsers(data.user_count);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    return (
        <Container fluid  className="mt-3">
            <Row>
                <Col md="auto">
                    <SideBar />
                </Col>
                <Col md={10}>
                    <Row>
                        <NavBar />
                        <Col>
                            <Row>
                                <Col md={4}>
                                    <div className="amount">
                                        <p>Posts</p>
                                        <h1>{posts}</h1>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="amount">
                                        <p>Comments</p>
                                        <h1>{comments}</h1>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="amount">
                                        <p>Users</p>
                                        <h1>{users}</h1>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>


        </Container>
    )
}

export default AdminLayout