import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Navbar, NavbarBrand } from 'reactstrap';
import MyHeader from './Header';
import MyFooter from './Foot';
import Menu from './MenuComponent';
import DishDetail from './DishComp';
import Home from './Home';
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

  showHome(){
    return (
      <Home />
    );
  }
  
  render(){
    return (
      //react application rendered in the page
      <div>
        <MyHeader />
        <Switch>
          <Route path='/home' component={this.showHome} />
          <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
          <Redirect to="/home" />
          <Menu dishes = {this.state.dishes} onClick={(dishID) => this.setDish(dishID)}/>
          <DishDetail mydish = {this.state.dishes.filter((mydish) => mydish.id == this.state.selectedDish)[0]}/>
        </Switch>
        <MyFooter />
      </div>
    )
  };
}

export default Main;
