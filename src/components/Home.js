import React from 'react';
import {Loading} from './LoadingLogo';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle} from 'reactstrap';

function ShowItem({item, isLoading, errMess}){
    if(isLoading){
        return(
            <Loading />
        );
    }

    else if(errMess){
        return(
            <h4>{errMess}</h4>
        );
    }

    else
        return(
            <Card>
                <CardImg src={item.image} alt={item.name} />
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null }
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        );
}

function Home(props){
    return(
        <div className="container">
            <div className="row">
                <div className = "col-12 col-md-4 mt-3 mb-3">
                    <ShowItem item = {props.dish} isLoading = {props.dishLoading} errMess={props.dishesErrMess}></ShowItem>
                </div>
                <div className = "col-12 col-md-4 mt-3 mb-3">
                    <ShowItem item = {props.leader}></ShowItem>
                </div>
                <div className = "col-12 col-md-4 mt-3 mb-3">
                    <ShowItem item = {props.promo}></ShowItem>
                </div>
            </div>
        </div>
    );
}

export default Home;