import React from 'react'
import '../css/navbar.css'
import {Link} from 'react-router-dom';
import OfferModal from './OfferModal';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Hero from './Hero';

function Navbarmenu() {
  //console.log("navbar rendered");
    return (
      <>
        <div className="loginBar container-fluid bg-dark d-flex flex-wrap align-items-center" style={{position:"fixed"}}>
            <nav className="navbar-dark d-inline-flex align-items-center flex-grow-1">

    <Link to="/" className="navbar-brand">
      {/* <img id="nav-logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlq5HBm3PMYychM_62YJmJJWksFJgcvrTaoA&usqp=CAU" alt="nav-logo" className="img-fluid d-inline-block align-baseline me-2" /> */}
      <span className="nav-title">Dude's</span><span className="nav-title-to">Food</span>
    </Link>
    
    </nav>
    <div className="d-inline-flex m-2 logincategory">
      <Link to="" className="aboutHotel btn-lg text-white hoverMe" data-bs-toggle="offcanvas" data-bs-target="#about-hotel" data-bs-keyboard="true" role="button">About</Link>
      <div className="">
      <Link to="/login"><button type="button" className="btn btn-outline-light btn-lg text-white loginbtn me-2">Login</button></Link></div>
      <div className="">
      <Link to="/register"><button type="button" className="btn btn-light btn-lg me-2">Sign up</button></Link>
        </div>
        </div>
    
        </div>
        <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="about-hotel">
            <div className="offcanvas-header">
              <h2 className="offcanvas-title" id="about-hotel">who are we?</h2>
              <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body px-3">
              <hr/>
              <div>
              Our technology platform connects customers, restaurant partners and 
              delivery partners, serving their multiple needs. Customers use our platform to search and 
              discover their favourite food items, read and write customer generated reviews, offer various deals on food items,
              order food delivery and make payments while dining-out at restaurants. We provide high quality food items delivered within short time. 
              </div>
            <hr/>
            <div className="d-flex flex-wrap">
            <Link to="/menu"><button type="button" className="btn btn-outline-success rounded-pill btn-sm m-2 mx-1">Menu</button></Link>
            <Link to="/"><button type="button" className="btn btn-outline-warning rounded-pill btn-sm m-2 mx-1">Hours & Location</button></Link>
            <Link to="/login"><button type="button" className="btn btn-outline-danger rounded-pill btn-sm m-2 mx-1">Login</button></Link>
            <Link to="/register"><button type="button" className="btn btn-outline-dark rounded-pill btn-sm m-2 mx-1">Signup</button></Link>
            <Link to="#"><button type="button" className="btn btn-outline-dark btn-sm rounded-pill disabled m-2 mx-1">Admin</button></Link>
            <Link to="#"><button type="button" className="btn btn-outline-primary btn-sm rounded-pill m-2 mx-1" data-bs-toggle="offcanvas" data-bs-keyboard="true" data-bs-target="#offerModal">Offers</button></Link>
            </div>
            </div>
          </div>

      {/* <Hero /> */}


          <Navbar collapseOnSelect expand="lg"  variant="light" className='text-dark bg-light'>
      <Container>
        <Navbar.Brand href="#home">Yumito</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>    




      <OfferModal/>
      </>
    )
}

export default React.memo(Navbarmenu)
