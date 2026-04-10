import React from 'react';
import { Carousel, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Slider = () => {
  const images = [
    { src: '/1.jfif', alt: 'Welcome to JNEC Central Library' },
    { src: '/2.jfif', alt: 'Reading Hall' },
    { src: '/3.jpg', alt: 'Library Stacks' },
    { src: '/4.jfif', alt: 'Library Entrance' },
    { src: '/5.jfif', alt: 'Digital Resources Section' },
    { src: '/6.jfif', alt: 'Reference Section' },
    { src: '/7.jfif', alt: 'Periodicals' },
    { src: '/8.jfif', alt: 'Group Study Area' },
    { src: '/9.jfif', alt: 'Computer Lab' },
    { src: '/10.jfif', alt: 'Library Facilities' },
    { src: '/11.jfif', alt: 'MGM University Library' }
  ];

  return (
    <Container fluid style={{padding: '10px 0'}}>
      <Carousel controls indicators interval={5000} pause="hover">
        {images.map((img, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={img.src}
              alt={img.alt}
              style={{height: '60vh', minHeight: '400px', width: '100%', objectFit: 'cover'}}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default Slider;
