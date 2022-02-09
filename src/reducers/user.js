import { LOGAR } from '../actions';

const INITIAL_STATE = {
  user: {
    email: '',
  },
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGAR:
    return { ...state, email: action.email };
  default:
    return state;
  }
};

export default userReducer;
