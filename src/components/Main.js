import React, {Component} from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import MyHeader from './Header';
import MyFooter from './Footer';
import Menu from './Menu';
import DishDetail from './DishDetail';
import Contact from './Contact';
import Home from './Home';
import About from '../components/About';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, addToCart, userLogin, userLogout, userSignup } from '../redux/Actions';
import AddCart from './Cart';

const mapStateToProps = state => {
  console.log('mapStateToProps is called here');
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => (
  console.log('mapDispatchToProps is called here'), {
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  fetchLeaders: () => { dispatch(fetchLeaders())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  postComment: (id, dishId, rating, author, comment) => dispatch(postComment(id, dishId, rating, author, comment)),
  addToCart: (dish, user) => dispatch(addToCart(dish, user)),
  userLogin: (username, password) => dispatch(userLogin(username, password)),
  userLogout: () => dispatch(userLogout()),
  userSignup: (firstname, lastname, username, password) => dispatch(userSignup(firstname, lastname, username, password)),
});


class Main extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    console.log('componentDidMount() is called here');
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    //this.props.userLogin();
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
              leader = {this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
              leaderErrMess = {this.props.leaders.isLoading}
              leaderLoading = {this.props.leaders.errormessage}
        />
      );
    }

    const DishID = ({match}) => {
      var length = this.props.comments.comments.length;
      return(
        <DishDetail mydish = {this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                    thecomment = {this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                    totalcomments = {length}
                    postComment={this.props.postComment}
                    commentsErrMess={this.props.comments.errMess}
                    thedishLoading = {this.props.dishes.isLoading}
                    thedishError={this.props.dishes.errormessage}
                    addToCart = {this.props.addToCart}
                    myuser = {this.props.user.user}
        />
      );
    }
    return (
      //react application rendered in the page
      <div>
        <MyHeader myuser = {this.props.user.user} userLogout = {this.props.userLogout} userLogin = {this.props.userLogin} userSignup={this.props.userSignup}/>
            <Switch location={this.props.location}>
              <Route path='/home' component={ShowHome} />
              <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
              <Route path='/menu/:dishId' component={DishID} />
              
              <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
              <Route exact path='/aboutus' component={() => <About leaders = {this.props.leaders.leaders} />} />
              <Redirect to="/home" />
            </Switch>
        <MyFooter />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
