// import './style/style.css'
import { Carousel, Container, Navbar, NavbarBrand, NavbarCollapse } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Nav } from 'react-bootstrap';
// const axios = require('axios');

function Home() {

    // useEffect(() => {
    //     fetch('http://localhost:3001/home')
    //     .then(response => {
    //         if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //         }
    //         return response.json(); // Chuyển đổi dữ liệu JSON từ response
    //     })
    //     .then(data => {
    //         console.log(data); // Xử lý dữ liệu đã nhận
    //     })
    //     .catch(error => {
    //         console.error('There was a problem with the fetch operation:', error);
    //     });
    // }, []);

    return (
      <>
      <Container>
        <Row className='mt-3'>
          <Carousel data-bs-theme="dark">
      <Carousel.Item>
        {/* <ExampleCarouselImage text="First slide" /> */}
        <img className='d-block w-100' src={require('../img/banner.png')} alt='image' style={{ maxHeight: '400px', objectFit: 'cover' }}/>
        <Carousel.Caption className='text-black'>
          <h3>First slide label</h3>s
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        {/* <ExampleCarouselImage text="Second slide" /> */}
        <img className='d-block w-100' src={require('../img/banner.png')} alt='image' style={{ maxHeight: '400px', objectFit: 'cover' }}/>
        <Carousel.Caption className='text-black'>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        {/* <ExampleCarouselImage text="Third slide" /> */}
        <img className='d-block w-100' src={require('../img/banner.png')} alt='image' style={{ maxHeight: '400px', objectFit: 'cover' }}/>
        <Carousel.Caption className='text-black'>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
        </Row>

        <Row className='mt-3'>
          
        </Row>

      </Container>
    </>
    );
}
  
export default Home;