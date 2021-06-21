import React from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { Link } from 'react-router-dom';

    function RenderMenu ({dish}) {
        return (
            <Card >
                <Link to={`/menu/${dish.id}`} >
                    <CardImg height = "400px" width= "100%" object src={dish.image} alt={dish.name}/>
                    <CardImgOverlay>
                        <CardTitle>
                            {dish.name}
                        </CardTitle>
                    </CardImgOverlay>
                </Link>
            </Card>
        );
    }

    const Menu = (props) => {
        const mymenu = props.dishes.map((thedish) => {
            return(
                <div className="col-12 col-md-6 mt-3"  key={thedish.id}>
                    <RenderMenu dish={thedish}/>
                </div>
            );
        });
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home"> Home </Link></BreadcrumbItem>
                        <BreadcrumbItem active> Menu </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="col-12">
                    <h3>Menu</h3>
                    <hr />
                </div>   
                <div className="row mb-4">
                    {mymenu}
                </div>
            </div>
        );
    };

export default Menu;