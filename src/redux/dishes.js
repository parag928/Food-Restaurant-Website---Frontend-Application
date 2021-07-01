import * as ActionTypes from './ActionTypes';
export const Dishes = (state = { isLoading: true, errormessage: null, dishes: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DISHES:
            return {...state, isLoading: false, errormessage: null, dishes: action.payload};

        case ActionTypes.DISHES_LOADING:
            return {...state, isLoading: true, errormessage: null, dishes: []}

        case ActionTypes.DISHES_FAILED:
            return {...state, isLoading: false, errormessage: action.payload};

        default:
          return state;
      }
};