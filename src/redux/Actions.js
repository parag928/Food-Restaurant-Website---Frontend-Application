import { baseUrl } from '../shared/baseURL';

export const addComment = (comment) => ({
    type: 'ADD_COMMENT',
    payload: comment
});

export const removeUser = () => ({
  type: 'LOGOUT_USER',
});

export const userLogout = () => (dispatch) => {
  return fetch(baseUrl + '/users' + '/logout')
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
      var errmess = new Error(error.message);
      throw errmess;
    })
  .then(user => user.json())
  .then(user => {localStorage.clear(); dispatch(removeUser()); alert(user.statusText)})
  .catch(error => dispatch(alert(error.message)));
};

export const postComment = (id, dishId, rating, author, comment) => (dispatch) => {
  const newComment = {
      id: id,
      dishId: dishId,
      rating: rating,
      comment: comment,
      author: author,
  };

  newComment.date = new Date().toISOString();
  
  return fetch(baseUrl + '/comments', {
      method: "POST",
      body: JSON.stringify(newComment),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
      Origin: baseUrl
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('The Error is ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
      throw error;
    })
  .then(response => response.json())
  .then(response => dispatch(addComment(response)))
  .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
};

export const userLogin = (username1, password1) => (dispatch) => {
  const userInfo = {
    username: username1,
    password: password1
  };
  
  return fetch(baseUrl + '/users' + '/login', {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
      },
      Origin: baseUrl
  })
  .then(response => response.json())
  .then (response => {
    if (response.success === true) {
      return response;
    } else {
      var error = new Error('The Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
  })
  .then(response => {localStorage.setItem('token', response.token); dispatch(addUser(response.userAcc))})
  .catch(error =>  {alert(error.message); dispatch(loginFailed(error.message))});
};

export const userSignup = (firstname1, lastname1, username1, password1) => () => {
  const userInfo = {
    firstname: firstname1,
    lastname: lastname1,
    username: username1,
    password: password1
  };
  return fetch(baseUrl + '/users' + '/signup', {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
      },
      Origin: baseUrl
  })
  .then(response => response.json())
  .then (response => {
    if (response.success === true) {
      return response;
    } else {
      var error = new Error('The Error is ' + response.error);
      error.response = response;
      throw error;
    }
  })
  .then(response => {alert(response.status)})
  .catch(error =>  {alert(error.message)});
};

export const addToCart = (dish, user) => (dispatch) => {
  const myCart = {
    dish: dish,
    user: user
  };
  return fetch(baseUrl + '/cart' , {
      method: "POST",
      body: JSON.stringify(myCart),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
      Origin: baseUrl
  })
  .then(response => response.json())
  .then (response => {
    if (response.success === true ) {
      return response;
    } else {
      var error = new Error('The error is ' + response.error);
      error.response = response;
      throw error;
    }
  })
  .then(response => {dispatch(loadCart(response.cart))})
  .catch(error =>  {alert(error.message)});
};

export const addUser = (user) => ({
  type: 'LOGIN_SUCCESS',
  payload: user
})

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));
    return fetch(baseUrl + '/dishes')
      .then (response => {
          if (response.ok) {
              return response;
            } else {
              var error = new Error('The current Error ' + response.status + ': ' + response.statusText);
              error.response = response;
              throw error;
            }
          },
          //IF the server doesn't respond at all
          error => {
              var errmess = new Error(error.message);
              throw errmess;
          })
      .then(response => response.json())
      .then(dishes => dispatch(addDishes(dishes)))
      .catch(error => dispatch(dishesFailed(error.message)));
};

export const dishesLoading = () => ({
    type: 'DISHES_LOADING'
});

export const dishesFailed = (errmessage) => ({
    type: 'DISHES_FAILED',
    payload: errmessage
});

export const addDishes = (dishes) => ({
    type: 'ADD_DISHES',
    payload: dishes
})

export const fetchComments = () => (dispatch) => {    
    return fetch(baseUrl + '/comments')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
    type: 'COMMENTS_FAILED',
    payload: errmess
});

export const addComments = (comments) => ({
    type: 'ADD_COMMENTS',
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading());
    return fetch(baseUrl + '/promotions')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
}

export const fetchLeaders = () => (dispatch) => {
    
  dispatch(leadersLoading(true));
  return fetch(baseUrl + '/leaders')
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
      var errmess = new Error(error.message);
      throw errmess;
    })
  .then(response => response.json())
  .then(leaders => dispatch(addLeaders(leaders)))
  .catch(error => dispatch(leadersFailed(error.message)));
};

export const promosLoading = () => ({
    type: 'PROMOS_LOADING'
});

export const promosFailed = (errmess) => ({
    type: 'PROMOS_FAILED',
    payload: errmess
});

export const loginFailed = (errmess) => ({
  type: 'LOGIN_FAILED',
  payload: errmess
});

export const addPromos = (promos) => ({
    type: 'ADD_PROMOS',
    payload: promos
});

export const addLeaders = (leaders) => ({
  type: 'ADD_LEADERS',
  payload: leaders
});

export const loadCart = (cart) => ({
  type: 'CART_SUCCESS',
  payload: cart
});

export const leadersFailed = (errmess) => ({
  type: 'LEADERS_FAILED',
  payload: errmess
});
export const leadersLoading = () => ({
  type: 'LEADERS_LOADING'
});

export const userLoading = () => ({
  type: 'USER_LOADING'
});