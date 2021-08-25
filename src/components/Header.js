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
      isModalOpen: false,
      SignUpForm: false,
      LoggedIn: false
    };
    this.NavbarChange = this.NavbarChange.bind(this);
    this.ModalChange = this.ModalChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.SignUpChange = this.SignUpChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(){
    this.props.userLogout();
    this.setState({
      LoggedIn: !(this.state.LoggedIn)
    })
  }

  NavbarChange(){
    this.setState({
      NavOpen: !(this.state.NavOpen)
    })
  }
  
  SignUpChange(){
    this.setState({
      SignUpForm: !(this.state.SignUpForm)
    })
  }

  ModalChange(){
    this.setState({
      isModalOpen: !(this.state.isModalOpen)
    })
  }
  
  handleSubmit(event) {
    if (this.firstname != null){
      event.preventDefault();
      alert('Firstname: ' + this.firstname.value + ' Lastname: ' + this.lastname.value
        + ' username: ' + this.username.value + ' password: ' + this.password.value);
      this.props.userSignup(this.firstname.value, this.lastname.value, this.username.value, this.password.value);
    }
    else{
      event.preventDefault();
      this.ModalChange();
      this.props.userLogin(this.username.value, this.password.value);
      if (this.props.myuser != null){
        alert('Welcome home : ' + this.props.myuser.firstname);
        this.setState({
          LoggedIn: !(this.state.LoggedIn)
      })
    }
  }
  }  
  render() {
    return(
      <div>
      <Navbar className='mr-auto' dark expand="md">
        <div className="container">
          <NavbarToggler onClick={this.NavbarChange} />
            <NavbarBrand href="/"> <img src='assets/images/logo.png' height="30" width="41" alt='Ristorante Con Fusion' /></NavbarBrand>
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
                
                  <div>
                    {
                      (this.state.LoggedIn === true) ? 
                  <div>
                  <Nav className="mr-auto" navbar> 
                  <NavItem>
                  <NavLink className="nav-link" to=''> <span className="fa fa-user fa-lg"></span> {this.props.myuser.firstname}</NavLink>
                  <NavLink className="nav-link" to='/usercart'> <span className="fa fa-user fa-lg"></span> Cart </NavLink>
                  <Button outline dark onClick={this.handleLogout}><span className="fa fa-sign-out fa-lg"></span> Logout </Button> </NavItem> </Nav> </div>
                  : 
                      <div> <Nav className="mr-auto" navbar>
                      <NavItem>
                        <Button outline dark onClick={this.ModalChange}><span className="fa fa-sign-in fa-lg"></span> Login </Button>
                      </NavItem> </Nav> </div>
                    }
                    </div>
            </Collapse>
        </div>
      </Navbar>
    
      <Modal isOpen={this.state.isModalOpen} toggle={this.ModalChange}>
          <ModalHeader bg-danger toggle={this.ModalChange}> Login </ModalHeader>
            <ModalBody>
              <Form onSubmit={this.handleSubmit}>
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
                  <br></br>
                  <br></br>
                  <div className="container">
                  <div className="row">
                  <p> Don't have an Account? Create one </p>
                  <Button className="fa fa-xsm" onClick= {this.SignUpChange} > Here </Button>
                  </div>
                  </div>
              </Form>
            </ModalBody>
      </Modal>
      <Modal isOpen={this.state.SignUpForm} toggle={this.SignUpChange}>
          <ModalHeader bg-danger toggle={this.SignUpChange}> Signup </ModalHeader>
            <ModalBody>
              <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                      <Label htmlFor="firstname">Firstname</Label>
                      <Input type="text" id="firstname" name="firstname"
                          innerRef={(input) => this.firstname = input} />
                  </FormGroup>
                  <FormGroup>
                      <Label htmlFor="lastname">Lastname</Label>
                      <Input type="text" id="lastname" name="lastname"
                          innerRef={(input) => this.lastname = input}  />
                  </FormGroup>
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
                  <Button type="submit" value="submit" color="primary">Signup</Button>
              </Form>
            </ModalBody>
      </Modal>
      <Jumbotron>
           <div className="container">
               <div className="row row-header">
                   <div className="col-12 col-sm-8">
                       <h1> Food Restaurant </h1>
                       <p>The food restaurant website for anyone interested in exploring many unique dishes from all around the world!</p>
                   </div>
               </div>
           </div>
       </Jumbotron>
      </div>
    );
  }
}

export default MyHeader;