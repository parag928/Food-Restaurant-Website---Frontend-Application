export const User = (
    state = {errmess: null, cart: null}, action) => {
    switch (action.type) {
        case 'CART_SUCCESS':
            return {...state, errmess: null, cart: action.payload};

        case 'CART_FAILED':
            return {...state, errmess: action.payload, cart: null};
              
        default:
          return state;
      }
};