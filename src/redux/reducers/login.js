import { LOGIN_ACTION } from '../actions';

const initialState = {
  name: '',
  email: '',
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN_ACTION: return state;
  default: return state;
  }
};

export default loginReducer;
