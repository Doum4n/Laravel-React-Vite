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
import SubPost from './component/sub_post';

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

  const most_view_posts = [
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
    },
    {
      id: 4,
      title: "Tin tức số 4",
      image: banner,
      description: "Đây là một mô tả ngắn về bài viết số 4."
    }
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
      <Container>
        <Row>
            <Col md={8}>
              <Row>
                <Col md={8} key={post.id}>
                  <Post
                    id={post.id}
                    title={post.title}
                    image={post.image}
                    description={post.description}
                  />
                </Col>

                <Col md={4}>
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
                <Col md={4}>
                  <Post
                    id={post.id}
                    title={post.title}
                    image={post.image}
                    description={post.description}
                  />
                </Col>
              ))}
              </Row>
            </Col>

            <Col md={4} style={{float: 'right'}}>
                <h2>Most view</h2>
                {most_view_posts.map((post) => (
                  <SubPost
                    id={post.id}
                    title={post.title}
                    image={post.image}
                    description={post.description}
                  />
                ))}
            </Col>
        </Row>

        <div>
          <h2 className='mb-4'>Popular</h2>
          {posts.map((post) => (
             <Col md={4} className='me-3 mb-3' style={{float: 'left'}} key={post.id}> {/* Mỗi post sẽ chiếm 6 cột (50% chiều rộng) */}
               <Row>
                <Col md="auto" className='d-flex align-items-center'>
                  <h2>#1</h2>
                </Col>
                <Col className='d-flex align-items-center'>
                  <Card style={{width: '95%'}}>
                    <Card.Body>
                      <Card.Title>{post.title}</Card.Title> {/* Hiển thị tiêu đề từ post */}
                      <Card.Text>{post.text}</Card.Text> {/* Hiển thị văn bản từ post */}
                    </Card.Body>
                  </Card>
                </Col>
               </Row>
             </Col>
          ))}
        </div>
        
      </Container>
    </>
    );
}
  
export default Home;