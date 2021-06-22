import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
  Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Input, Label} from 'reactstrap';
import { NavLink } from 'react-router-dom';

class MyHeader extends Component {
  constructor(props){
    super(props);
    this.state = {
      NavOpen: false,
      isModalOpen: false
    };
    this.NavbarChange = this.NavbarChange.bind(this);
    this.ModalChange = this.ModalChange.bind(this);
    this.userLogin = this.userLogin.bind(this);
  }

  NavbarChange(){
    this.setState({
      NavOpen: !this.state.NavOpen
    })
  }

  ModalChange(){
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  userLogin(event) {
    this.ModalCHange();
    alert("Username: " + event.username.value + " Password: " + event.password.value
        + " Remember: " + event.remember.checked);
    event.preventDefault();
  }

  
  render() {
    return(
    <React.Fragment>
      <Navbar dark expand="md">
        <div className="container">
          <NavbarToggler onClick={this.NavbarChange} />
            <NavbarBrand className="mr-auto" href="/"> <img src='assets/images/logo.png' height="30" width="41" alt='Ristorante Con Fusion' /></NavbarBrand>
            <Collapse isOpen={this.state.isNavOpen} navbar>
                <Nav navbar>
                <NavItem>
                      <NavLink className="nav-link"  to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                  </NavItem>
                  <NavItem>
                      <NavLink className="nav-link" to='/aboutus'><span className="fa fa-info fa-lg"></span> About Us</NavLink>
                  </NavItem>
                  <NavItem>
                      <NavLink className="nav-link"  to='/menu'><span className="fa fa-list fa-lg"></span> Menu</NavLink>
                  </NavItem>
                  <NavItem>
                      <NavLink className="nav-link" to='/contactus'><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                  </NavItem>
                  
                </Nav>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Button outline dark onClick={this.ModalChange}><span className="fa fa-sign-in fa-lg"></span> Login</Button>
                    </NavItem>
                </Nav>
            </Collapse>
        </div>
      </Navbar>
      <Modal isOpen={this.state.isModalOpen} toggle={this.ModalChange}>
          <ModalHeader toggle={this.ModalChange}> Login </ModalHeader>
            <ModalBody>
              <Form onSubmit={this.userLogin}>
                  <FormGroup>
                      <Label htmlFor="username">Username</Label>
                      <Input type="text" id="username" name="username"
                          innerRef={(input) => this.username = input} />
                  </FormGroup>
                  <FormGroup>
                      <Label htmlFor="password">Password</Label>
                      <Input type="password" id="password" name="password"
                          innerRef={(input) => this.password = input}  />
                  </FormGroup>
                  <FormGroup check>
                      <Label check>
                          <Input type="checkbox" name="remember"
                          innerRef={(input) => this.remember = input}  />
                          Remember me
                      </Label>
                  </FormGroup>
                  <Button type="submit" value="submit" color="primary">Login</Button>
                </Form>
            </ModalBody>
      </Modal>
      <Jumbotron>
           <div className="container">
               <div className="row row-header">
                   <div className="col-12 col-sm-8">
                       <h1>Ristorante con Fusion</h1>
                       <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                   </div>
               </div>
           </div>
       </Jumbotron>
    </React.Fragment>
    );
  }
}

export default MyHeader;