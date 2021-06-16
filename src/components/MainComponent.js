import React, {Component} from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import MyHeader from './Header';
import MyFooter from './Foot';
import Menu from './MenuComponent';
import DishDetail from './DishComp';
import {DISHES} from './dishes'


class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null
    }
  }

  setDish(myDish){
    this.setState({selectedDish: myDish});
  }

  render(){
    return (
      //react application rendered in the page
      <div>
        <MyHeader />
        <Menu dishes = {this.state.dishes} onClick={(dishID) => this.setDish(dishID)}/>
        <DishDetail mydish = {this.state.dishes.filter((mydish) => mydish.id == this.state.selectedDish)[0]}/>
        <MyFooter />
      </div>
    )
  };
}

export default Main;
