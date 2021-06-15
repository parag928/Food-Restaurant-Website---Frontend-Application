import React from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle} from 'reactstrap';

    function RenderMenu ({dish, onClick}) {
        return (
            <Card  
                onClick = {() => onClick(dish.id)}>
                <CardImg height = "400px" width= "100%" object src={dish.image} alt={dish.name}/>
                <CardImgOverlay>
                    <CardTitle>
                        {dish.name}
                    </CardTitle>
                </CardImgOverlay>
            </Card>
        );
    }

    const Menu = (props) => {
        const mymenu = props.dishes.map((thedish) => {
            return(
                <div className="col-12 col-md-6 mt-5"  key={thedish.id}>
                    <RenderMenu dish={thedish} onClick={props.onClick}/>
                </div>
            );
        });
        return (
            <div className="container">
                <div className="row">
                    {mymenu}
                </div>
            </div>
        );
    };

export default Menu;