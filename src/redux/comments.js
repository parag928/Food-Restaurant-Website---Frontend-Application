import * as ActionTypes from './ActionTypes';

export const Comments = (state = { errMess: null, comments:[]}, action) => {
    switch (action.type) {
      case 'ADD_COMMENTS':
        return {...state, errMess: null, comments: action.payload};
  
      case 'COMMENTS_FAILED':
        return {...state, errMess: action.payload};
  
      case 'ADD_COMMENT':
          var comment = action.payload;
          return { ...state, comments: state.comments.concat(comment)};
  
      default:
        return state;
    }
  };