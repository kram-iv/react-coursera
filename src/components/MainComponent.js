import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect} from 'react-redux';
import { addComment,fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';

const mapDispatchToProps = dispatch => ({
  
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes())}, /* fetchDishes() is a thunk and we are dispatching the thunk using dispatch method in mapDispatchToProps.*/
    //resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos())    
  });

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders        
    }
}

class Main extends Component {

  constructor(props) {
    super(props);

  }
  
  /*componentDidMount is a  lifecycle method */
  /* fetchDishes() will be called once component gets mounted in the view of the application.
   After it gets mounted the fetchDishes is called 
   and this will result in a load of dishes into app's redux's store ,
   and then once the dishes becomes available in the store, it's available for use by the app. */

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();    
  }  
/*
  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
  }
*/
  render() {

    const HomePage = () => {
        return(
            <Home
                dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}
                dishesErrMess={this.props.dishes.errMess}                
                promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                promoLoading={this.props.promotions.isLoading}
                promoErrMess={this.props.promotions.errMess}                
                leader={this.props.leaders.filter((leader) => leader.featured)[0]}
            />
        );
    }
    const DishWithId = ({match}) => {
        return(
            <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}            
            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            commentsErrMess={this.props.comments.errMess}
            addComment={this.props.addComment}
            />
        );
    }

    return (
      <div>
        <Header />
        {/*<Menu dishes={this.props.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />*/}
        {/*<DishDetail dish={this.props.dishes.filter((dish) => dish.id === this.props.selectedDish)[0]} />*/}

        <Switch>
            <Route path='/home' component={HomePage} />
            <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
            <Route path='/menu/:dishId' component={DishWithId} />} />
            <Route exact path='/contactus' component={Contact} />} />
            <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
            <Redirect to="/home" />
        </Switch>

        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));