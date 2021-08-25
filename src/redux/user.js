export const User = (
    state = {userloading: false, errmess: null, user: null}, action) => {
    switch (action.type) {
        case 'USER_LOADING':
            return {...state, userloading: true, errmess: null, user: null};

        case 'LOGIN_SUCCESS':
            return {...state, userloading: false, errmess: null, user: action.payload};

        case 'LOGIN_FAILED':
            return {...state, userloading: false, errmess: action.payload, user: null};

        case 'LOGOUT_USER':
            return {...state, userloading: false, errmess: null, user: null};
        
        default:
          return state;
      }
};