import React, {Component} from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import MyHeader from './Header';
import MyFooter from './Footer';
import Menu from './MenuComponent';
import DishDetail from './DishComp';
import Contact from './Contact';
import Home from './Home';
import About from '../components/AboutComponent';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

class Main extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const ShowHome = () => {
      return (
        <Home dish = {this.props.dishes.filter((dish) => dish.featured)[0]} 
              leader = {this.props.leaders.filter((leader) => leader.featured)[0]}
              promo = {this.props.promotions.filter((promo) => promo.featured)[0]} 
        />
      );
    }

    const DishID = ({match}) => {
      return(
        <DishDetail mydish = {this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                    thecomment = {this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        />
      );
    }
  
  
    return (
      //react application rendered in the page
      <div>
        <MyHeader />
        <Switch>
          <Route path='/home' component={ShowHome} />
          <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
          <Route path='/menu/:dishId' component={DishID} />
          <Route exact path='/contactus' component={Contact} />
          <Route exact path='/aboutus' component={() => <About leaders = {this.props.leaders} />} />
          <Redirect to="/home" />
        </Switch>
        <MyFooter />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
