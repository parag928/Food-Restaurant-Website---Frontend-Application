import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Navbar, NavbarBrand } from 'reactstrap';
import MyHeader from './Header';
import MyFooter from './Footer';
import Menu from './MenuComponent';
import DishDetail from './DishComp';
import Contact from './Contact';
import Home from './Home';
import {DISHES} from '../shared/dishes'
import {LEADERS} from '../shared/leaders'
import {PROMOTIONS} from '../shared/promotions'
import {COMMENTS} from '../shared/comments'
import About from '../components/AboutComponent'

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      dishes: DISHES,
      leaders: LEADERS,
      promotions: PROMOTIONS,
      comments: COMMENTS
    };
  }

  render() {
    const ShowHome = () => {
      return (
        <Home dish = {this.state.dishes.filter((dish) => dish.featured)[0]} 
              leader = {this.state.leaders.filter((leader) => leader.featured)[0]}
              promo = {this.state.promotions.filter((promo) => promo.featured)[0]} 
        />
      );
    }

    const DishID = ({match}) => {
      return(
        <DishDetail mydish = {this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                    thecomment = {this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        />
      );
    }
  
  
    return (
      //react application rendered in the page
      <div>
        <MyHeader />
        <Switch>
          <Route path='/home' component={ShowHome} />
          <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
          <Route path='/menu/:dishId' component={DishID} />
          <Route exact path='/contactus' component={Contact} />
          <Route exact path='/aboutus' component={() => <About leaders = {this.state.leaders} />} />
          <Redirect to="/home" />
        </Switch>
        <MyFooter />
      </div>
    );
  }
}

export default Main;
