import { Tab } from 'bootstrap';
import React, { Component } from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';

class DishDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }


    renderDish(dish){
        return(
            <Card>
                <CardImg height = "400px" width= "100%" top object src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }

    renderComments(dishComments){
        const viewcomments = dishComments.map((all) => {
            if (all != null){
                return (
                    <div>
                        <ul className = "comments">
                            <comment>
                                {all.comment}
                            </comment>
                            <ol>
                             {all.author} {all.date}
                            </ol>
                        </ul>
                    </div>
                )
            }
            else{
                <div>
                    <h6> No Comments Sorry! </h6>
                </div>
            }
        });

        return (
            <div>
                <h4 className="text-center"> Comments </h4>
                {viewcomments};
            </div>
        )
    }

    render(){
        if (this.props.selectedDish != null){
            return(
                <div class="row">
                    <div class="col-12 col-md-6 mt-5 mb-5">
                        {this.renderDish(this.props.selectedDish)}
                    </div>
                    <div className = "col-12 col-md-5 mt-5">
                        {this.renderComments(this.props.selectedDish.comments)}
                    </div>
                </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }
}
export default DishDetail;