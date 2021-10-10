import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, RESET_ERROR,USER_LOGOUT } from "./../constants/userConstants";

const init_state = {
  loggedIn: false,
  error: null,
  Username: null,
  logging: false
};

const userReducer = (state = init_state, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      newState.loggedIn = false;
      newState.error = null;
      newState.Username = null;
      newState.logging = true;
      return newState;

    case USER_LOGIN_SUCCESS:
      newState.loggedIn = true;
      newState.Username = action.payload;
      newState.logging = false;
      newState.error = null;
      return newState;

    case USER_LOGIN_FAILURE:
      newState.loggedIn = false;
      newState.error = action.payload;
      newState.Username = null;
      newState.logging = false;
      return newState;

    case USER_LOGOUT:
    newState.loggedIn= false;
    newState.error= null;
    newState.Username=null;
    newState.logging= false;
    return newState;

    case RESET_ERROR:
      return Object.assign({}, state, { error: null });
    default:
      return state;
  }
};

export default userReducer;