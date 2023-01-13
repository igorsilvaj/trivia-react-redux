import { LOGIN_ACTION } from '../actions';

const initialState = {
  name: '',
  gravatarEmail: '',
  img: '',
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN_ACTION:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
      img: action.img,
    };
  default: return state;
  }
};

export default loginReducer;
