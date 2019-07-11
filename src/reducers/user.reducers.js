import { SET_USER, SET_USER_IP } from '../actions/user.actions';
import { initialState } from '../initialState';

export const userReducer = (user = initialState.user, action) => {
  let newUser = {...user};

  switch (action.type) {

    case SET_USER:
      return action.payload;

    case SET_USER_IP:
      newUser.ip = action.payload;
      return newUser;

    case 'SET_USER_TOKEN':
      newUser.token = action.payload;
      return newUser;

    default:
      return user;
  }
};
