import {React, Component} from 'react';
import { Media } from 'reactstrap';
import { baseUrl } from '../shared/baseURL';

function ViewDish({each}){
    if (each === null){
        return(
            <div>
                <h1>No Dishes are added to the Cart at this moment</h1>
            </div>
        )
    }
    else{
        return(
            <div class="media">
                <img class="d-flex mr-3 mt-4 img-thumbnail align-self-top" width="250px" src={baseUrl+each.image} alt={each.name}/>
                <div class="media-body">
                    <h2 class="mt-4"> {each.name}</h2>
                    <p class="d-none d-sm-block"> {each.description} </p>
                </div>
            </div>
        );
    }
}

class AddCart extends Component{
    constructor(props){
        super(props);
        
    }

    render(){
        const view = this.props.selDishes.map((all) => {
            return(
                <ViewDish each = {all}/>
            ); 
            }
        );
        return(
            <div className="container">
                <div className="row row-content">
                    <div className="col-9">
                        <Media list>
                            {view}
                        </Media>
                    </div>
                </div>
            </div>
        );
    };
}

export default AddCart;