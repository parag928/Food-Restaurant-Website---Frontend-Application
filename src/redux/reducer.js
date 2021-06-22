import { createStore } from 'redux';
import {DISHES} from '../shared/dishes'
import {LEADERS} from '../shared/leaders'
import {PROMOTIONS} from '../shared/promotions'
import {COMMENTS} from '../shared/comments'

const initialState = {
    dishes: DISHES,
    leaders: LEADERS,
    promotions: PROMOTIONS,
    comments: COMMENTS
};

const reducerFunction = (mystate = initialState, myaction) => {
    return mystate;
};

export const ConfigureStore = () => {
    const mystore = createStore(
        reducerFunction, // reducer
        initialState, // our initialState
    );

    return mystore;
}