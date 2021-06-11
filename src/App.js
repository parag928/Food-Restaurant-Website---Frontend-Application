import React, {Component} from 'react';
import logo from './logo.svg';
import { Navbar, NavbarBrand } from 'reactstrap';
import './App.css';
import { DISHES } from './shared/dishes.js';
import Menu from './components/MenuComponent';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      dishes: DISHES
    }
  }
  render(){
    return (
      //react application rendered in the page
      <div>
        <Navbar dark color="danger">
            <div class="container">
              <NavbarBrand className="text-center" href=""> The Food Store </NavbarBrand>
            </div>
        </Navbar>
        <Menu dishes = {this.state.dishes}/>
      </div>
    )
  };
}

export default App;
