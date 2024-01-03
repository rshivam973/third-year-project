import React from 'react'
import Button from 'react-bootstrap/Button';
import { Link, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import image from './deliveryguy.png';
import CardContainer from './CardContainer';
import Menu from './Menu';
const Hero = () => {
  return (
    <section>
        <Container>
        <Row >
            <Col className='mt-4'>
          <h1 className='mt-5  fw-bold me-3 ' style={{fontSize:"6rem"}}>The Fastest <br/> Delivery in <span style={{color:"orange"}}>Your City.</span></h1>
          <p className='text-left mr-5 fs-4'>Delicious food, minimal charges,<br/> fast delivery Just a Click Away.<br/></p>  
          <br />
          <Link to="/Menu"><Button variant="warning">Order Now</Button></Link>
          </Col>
          
        <Col>
            <img src={image} style={{height:"100%",width:"auto"}}/>
        </Col>
        </Row>
        </Container>
       
    </section>
  )
}
export default Hero;
