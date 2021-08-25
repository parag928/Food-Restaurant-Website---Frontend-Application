import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseURL';


function RenderLeader({theleader}){
    return(
            <div class="media">
                <img class="d-flex mr-3 mt-4 img-thumbnail align-self-top" width="325px" src={baseUrl + theleader.image} alt={theleader.name}/>
                <div class="media-body">
                    <h2 class="mt-4"> {theleader.name}</h2>
                    <h5 > {theleader.designation} </h5>
                    <p class="d-none d-sm-block"> {theleader.description} </p>
                </div>
                
            </div>
    );
}

function About(props) {
    const leaders = props.leaders.map((leader) => {
        return (
            <RenderLeader theleader = {leader} />
        );
    });

    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>About Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>About Us</h3>
                    <hr />
                </div>                
            </div>
            <div className="row row-content">
                <div className="col-12 col-md-6">
                    <h2>Our History</h2>
                    <p>Started in June 2021, This Food restaurant website provides unique dishes that are available for the users to view, and leave comments from the user who has already tried it </p>
                </div>
                <div className="col-12 col-md-5">
                    <Card>
                        <CardHeader className="bg-primary text-white">Facts At a Glance</CardHeader>
                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-6">Started</dt>
                                <dd className="col-6">June 2021</dd>
                                <dt className="col-6">Location</dt>
                                <dd className="col-6">Laurel, Maryland, United States</dd>
                                <dt className="col-6">Number of Employees</dt>
                                <dd className="col-6">1</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-12">
                    <br></br>
                    <Card>
                        <CardBody className="bg-faded">
                            <blockquote className="blockquote">
                                <p className="mb-0"> Humor keeps us alive. Humor and food. Don't forget food. You can go a week without laughing. </p>
                                <footer className="blockquote-footer"> Joss Whedon,
                                <cite title="Source Title"> Food Quotes,
                                © 2021 Goodreads, Inc. </cite>
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h2>Corporate Leadership</h2>
                </div>
                <div className="col-12">
                    <Media list>
                        {leaders}
                    </Media>
                </div>
            </div>
        </div>
    );
}

export default About;    