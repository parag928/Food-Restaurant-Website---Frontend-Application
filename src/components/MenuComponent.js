import React, { Component } from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';
import DishDetail from './DishComp';

class Menu extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedDish: null
        }
    }
    
    setDish(myDish){
        this.setState({selectedDish: myDish});
    }

    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
                <div className = "col-12 col-md-6 mt-5">
                    <Card key= {dish.id} onClick ={
                        () => this.setDish(dish)} >
                        <CardImg height = "400px" width= "100%" object src={dish.image} alt={dish.name}></CardImg>
                        <CardImgOverlay>
                            <CardTitle>
                                {dish.name}
                            </CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            )
        });
        return(
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                <DishDetail selectedDish = {this.state.selectedDish}></DishDetail>
            </div>
        );
    }
}

export default Menu;