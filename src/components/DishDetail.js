import {React, Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, Button, Row, Col, Label, BreadcrumbItem, Modal, ModalHeader, ModalBody} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingLogo';
import { baseUrl } from '../shared/baseURL';
import { FadeTransform} from 'react-animation-components';

 
const required = (value) => value && (value.length);
const maxLength = (length) => (value) => !(value) || (value.length < length);
const minLength = (length) => (value) => value && (value.length > length);


class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            openModal: false
        }
        this.changeToggle = this.changeToggle.bind(this);
        this.showChange = this.showChange.bind(this);
    }

    changeToggle(){
        if (this.props.myuser === null){
            alert('You must be logged in order to post a comment!')
        }
        else{
            this.setState({
                openModal: !(this.state.openModal)
            })
        }
    }
    
    showChange(values){
        console.log('Your Current Comment Info is: ' + JSON.stringify(values));
        this.props.postComment(this.props.totalcomm, this.props.DishID, values.rating, this.props.myuser.firstname + ' ' + this.props.myuser.lastname, values.comment);
    }
    render(){
        return(
            <div>
                <Button onClick = {this.changeToggle} className="ml-2" ml-5 danger> <span className="fa fa-comment fa-lg"></span> Leave a Comment </Button>
                    <Modal isOpen={this.state.openModal} toggle={this.changeToggle}>
                        <ModalHeader toggle={this.changeToggle}> Submit Your Comment </ModalHeader>
                            <ModalBody>
                                <LocalForm onSubmit={(answer) => this.showChange(answer)}>
                                    <Row className="form-group">
                                        <Label htmlFor="rating" md={2}>Rating</Label>
                                            <Col md={10}>
                                                <Control.select s={{size:3}} model=".rating" id="rating" name="rating"
                                                className="form-control">
                                                    <option> 1 </option>
                                                    <option> 2 </option>
                                                    <option> 3 </option>
                                                    <option> 4 </option>
                                                    <option> 5 </option>
                                                </Control.select>
                                            </Col>
                                    </Row>

                                    <Row className="form-group">
                                        <Label htmlFor="comment" md={2}>Comment</Label>
                                        <Col md={{size:10}}>
                                            <Control.textarea rows="8" model=".comment" id="comment" name="comment"
                                            className="form-control">
                                            validators = {{
                                                required: required
                                            }}
                                            </Control.textarea>
                                            <Errors
                                                className="text-primary"
                                                model=".comment"
                                                show="touched"
                                                messages={{
                                                    required: 'Required field'
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Col md={{size:3, offset: 2}}>
                                            <Button type="submit" color="primary">
                                                Submit a Comment
                                            </Button>
                                        </Col>
                                    </Row>
                                </LocalForm>
                            </ModalBody>
                    </Modal>
            </div>
        );
    }
}

class AddCart extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
        this.addDishes = this.addDishes.bind(this);
    }

    addDishes(){
        if (this.props.myUser === null){
            alert('You must be logged in to add to cart')
        }
        else{
            this.props.addToCart(this.props.myDish._id, this.props.myUser._id);
        }
    }

    render(){
        return(
            <Button onClick = {this.addDishes} color="primary" className="ml-2" ml-5 > <span className="fa fa-shopping-cart fa-lg "></span> Add to Cart </Button>
        );
    }
}
    
function RenderDish({dish1}){
    return(
        <Card>
            <CardImg height = "400px" width= "100%" top object src={baseUrl + dish1.image} alt={dish1.name} />
            <CardBody>
                <CardTitle>{dish1.name}</CardTitle>
                <CardText>{dish1.description}</CardText>
            </CardBody>
        </Card>
    );
}


function RenderComments({user, totalcomm, Comments, dishID, postComm}){
    const TheComments = Comments.map((all) => {
        if (all != null){
            return (
                <div>
                    <ul className = "list-unstyled">
                        <li>
                            {all.comment}
                        </li>
                        
                        <p>
                            -- Author: {all.author}, Rating: {all.rating} / 5, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(all.date)))}
                        </p>
                    </ul>
                </div>
            );
        }
        else{
            return(
                <div>
                    <h6> No Comments Sorry! </h6>
                </div>
            );
        }
    });

    return (
        <div>
            <h4 className="text-center"> Comments </h4>
                {TheComments};

            <br/><br/>

            <div className="row">
                <CommentForm myuser = {user} totalcomm = {totalcomm} DishID = {dishID} postComment = {postComm}/>
            </div>
        </div>
    );
}

const DishDetail = (props) => {
    if (props.thedishLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.thedishError) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.mydish != null){
        return(
            <div class="container">
                <div class="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.mydish.name}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div class="row">
                    <div className="col-6 col-md-4">
                        <h3>{props.mydish.name}</h3>
                    </div>
                    <div className="col-6 offset-md-5 col-md-3">
                        <AddCart myDish = {props.mydish} myUser = {props.myuser} addToCart = {props.addToCart}/>  
                    </div>     
                </div>
                <hr></hr>
                <div>
                    <FadeTransform in transformProps={{ exitTransform: 'scale(0.5) translateY(-50%)'}}>
                        <div class="row">
                            <div class="col-12 col-md-6 mt-5 mb-5">
                                <RenderDish dish1 = {props.mydish} />
                                
                            </div>
                            <div className = "col-12 col-md-5 mt-5" width="100%">
                                <RenderComments user = {props.myuser} totalcomm = {props.totalcomments} Comments = {props.thecomment} dishID = {props.mydish.id} postComm = {props.postComment} addToCart = {props.addToCart}/>
                                <br></br>
                                
                            </div>     
                        </div>
                    </FadeTransform>
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