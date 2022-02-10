import { SAVE_LOGIN_INPUT } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_LOGIN_INPUT:
    return { ...state, email: action.payload };

  default:
    return state;
  }
};

export default user;
