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
import { actions } from 'react-redux-form';
import { postComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
});


class Main extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }
  render() {
    const ShowHome = () => {
      return (
        <Home dish = {this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishLoading = {this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errormessage} 

              promo = {this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              promoLoading={this.props.promotions.isLoading}
              promoErrMess={this.props.promotions.errMess} 
              leader = {this.props.leaders.filter((leader) => leader.featured)[0]}
              
        />
      );
    }

    const DishID = ({match}) => {
      return(
        <DishDetail mydish = {this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
        
                    thecomment = {this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                    postComment={this.props.postComment}
                    commentsErrMess={this.props.comments.errMess}
                    thedishLoading = {this.props.dishes.isLoading}
                    thedishError={this.props.dishes.errormessage}
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
          <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
          <Route exact path='/aboutus' component={() => <About leaders = {this.props.leaders} />} />
          <Redirect to="/home" />
        </Switch>
        <MyFooter />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
