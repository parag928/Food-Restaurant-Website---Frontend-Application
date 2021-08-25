export const Dishes = (state = { isLoading: true, errormessage: null, dishes: []}, action) => {
    switch (action.type) {
        case 'ADD_DISHES':
            return {...state, isLoading: false, errormessage: null, dishes: action.payload};

        case 'DISHES_LOADING':
            return {...state, isLoading: true, errormessage: null, dishes: []}

        case 'DISHES_FAILED':
            return {...state, isLoading: false, errormessage: action.payload};

        default:
          return state;
      }
};