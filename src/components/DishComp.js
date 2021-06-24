import {React, Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, Button, Row, Col, Label, BreadcrumbItem, Modal, ModalHeader, ModalBody} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
    
const required = (val) => val && (val.length);
const maxLength = (len) => (val) => !(val) || (val.length < len);
const minLength = (len) => (val) => val && (val.length > len);

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
        this.setState({
            openModal: !(this.state.openModal)
        })
    }
    showChange(values){
        console.log('Your Current Comment Info is: ' + JSON.stringify(values));
        alert('Your Current Comment Info is: ' + JSON.stringify(values));
        this.props.addComment(this.props.DishID, values.rating, values.author, values.comment);

    }
    render(){
        return(
            <div>
                <Button onClick = {this.changeToggle} className="ml-2" ml-5 danger> <span className="fa fa-comment fa-lg"></span> Leave a Comment </Button>
                    <Modal isOpen={this.state.openModal} toggle={this.changeToggle}>
                        <ModalHeader toggle={this.changeToggle}> Submit Your Comment </ModalHeader>
                            <ModalBody>
                                <LocalForm onSubmit={(values) => this.showChange(values)}>
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
                                        <Label htmlFor="author" md={2}>Your Name</Label>
                                        <Col md={10}>
                                            <Control.text model=".author" id="author" name="author" 
                                            className="form-control" placeholder="Full Name"
                                            validators = {{
                                                required, minlength: minLength(3), maxlength: maxLength(15)
                                            }}
                                            >
                                            </Control.text>
                                        
                                            <Errors
                                                className="text-danger"
                                                model=".author"
                                                show="touched"
                                                messages={{
                                                    required: 'Required field',
                                                    minlength: 'Must be greater than 2 characters',
                                                    maxlength: 'Must be 15 characters or less'
                                                }}
                                            />
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
                                                Log in
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


function RenderComments({Comments, dishID, addComm}){
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
            <br/>
            <br/>
            <div className="row">
                <CommentForm DishID = {dishID} addComment = {addComm}/>
            </div>
        </div>
    );
}

const DishDetail = (props) => {
    if (props.mydish != null){
        return(
            <div class="container">
                <div class="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.mydish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.mydish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div class="row">
                    <div class="col-12 col-md-6 mt-5 mb-5">
                        <RenderDish dish1 = {props.mydish} />
                    </div>
                    <div className = "col-12 col-md-5 mt-5" width="100%">
                        <RenderComments Comments = {props.thecomment} dishID = {props.mydish.id} addComm = {props.addComment}/>
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