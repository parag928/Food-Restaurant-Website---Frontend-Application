import React from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';
    
    function RenderDish({dish1}){
        return(
            <Card>
                <CardImg height = "400px" width= "100%" top object src={dish1.image} alt={dish1.name} />
                <CardBody>
                    <CardTitle>{dish1.name}</CardTitle>
                    <CardText>{dish1.description}</CardText>
                </CardBody>
            </Card>
        );
    }

    function RenderComments({Comments}){
        const TheComments = Comments.map((all) => {
            if (all != null){
                return (
                    <div>
                        <ul className = "list-unstyled">
                            <li>
                                {all.comment}
                            </li>
                            <p>
                                --- {all.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(all.date)))}
                            </p>
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
                {TheComments};
            </div>
        );
    }

    const DishDetail = (props) => {
        if (props.mydish != null){
            return(
                <div class="container">
                    <div class="row">
                        <div class="col-12 col-md-6 mt-5 mb-5">
                            <RenderDish dish1 = {props.mydish} />
                        </div>
                        <div className = "col-12 col-md-5 mt-5" width="100%">
                            <RenderComments Comments = {props.mydish.comments} />
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return(
                <div>
                    <h1> </h1>
                </div>
            );
        }
    }

export default DishDetail;