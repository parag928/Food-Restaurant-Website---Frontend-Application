export const Leaders = (state = { isLoading: true, errormessage: null, leaders: []}, action) => {
    switch (action.type) {
        case 'ADD_LEADERS':
            return {...state, isLoading: false, errormessage: null, leaders: action.payload};

        case 'LEADERS_LOADING':
            return {...state, isLoading: true, errormessage: null, leaders: []}

        case 'LEADERS_FAILED':
            return {...state, isLoading: false, errormessage: action.payload};

        default:
          return state;
      }
};