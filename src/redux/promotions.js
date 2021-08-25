export const Promotions = (state  = { isLoading: true,
    errMess: null,
    promotions:[]}, action) => {
    switch (action.type) {
        case 'ADD_PROMOS':
            return {...state, isLoading: false, errMess: null, promotions: action.payload};

        case 'PROMOS_LOADING':
            return {...state, isLoading: true, errMess: null, promotions: []}

        case 'PROMOS_FAILED':
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
        }
};