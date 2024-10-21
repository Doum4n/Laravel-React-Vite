// import './style/style.css'
import { Carousel, Container, Navbar, NavbarBrand, NavbarCollapse } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Nav } from 'react-bootstrap';
import banner from '../assets/banner.png';
import axios from 'axios';
import Post from './component/post';
import { ListGroup } from 'react-bootstrap';

function Home() {

  const post =
  {
    id: 1,
    title: "Tin tức số 1",
    image: banner,
    description: "Đây là một mô tả ngắn về bài viết số 1."
  }

  const posts = [
    {
      id: 1,
      title: "Tin tức số 1",
      image: banner,
      description: "Đây là một mô tả ngắn về bài viết số 1."
    },
    {
      id: 2,
      title: "Tin tức số 2",
      image: banner,
      description: "Đây là một mô tả ngắn về bài viết số 2."
    },
    {
      id: 3,
      title: "Tin tức số 3",
      image: banner,
      description: "Đây là một mô tả ngắn về bài viết số 3."
    }
    // Thêm nhiều bài viết khác...
  ];

    useEffect(() => {
        fetch('http://0.0.0.0/test-db/1')
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json(); // Chuyển đổi dữ liệu JSON từ response
        })
        .then(data => {
            console.log(data); // Xử lý dữ liệu đã nhận
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }, []);


    return (
      <>
      <Container fluid>
        <Row>
          <Col md={6} key={post.id}>
            <Post
              id={post.id}
              title={post.title}
              image={post.image}
              description={post.description}
            />
          </Col>

          <Col md={3}>
            <Post
              id={post.id}
              title={post.title}
              image={post.image}
              description={post.description}
            />
          </Col>
        
        </Row>
        
        <Row>
        {posts.map((post) => (
          <Col md={3} >
            <Post
              id={post.id}
              title={post.title}
              image={post.image}
              description={post.description}
            />
          </Col>
         ))}
        </Row>

        <div>
          {posts.map((post) => (
            <Row>
              <Col md="auto">
                <h2>
                  #1
                </h2>
              </Col>
              <Col md={5}>
                <Card className='mb-3'>
                <Card.Body>
                  <Card.Title>
                    title
                  </Card.Title>
                  <Card.Text>
                    some text
                  </Card.Text>
                </Card.Body>
              </Card>
              </Col>
            </Row>
          ))}
        </div>
        
      </Container>
    </>
    );
}
  
export default Home;