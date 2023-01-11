import { REQUEST_TOKEN } from '../actions';

const initialState = {
  token: '',
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
  case REQUEST_TOKEN:
    return { ...state, token: action.payload };
  default: return state;
  }
};

export default tokenReducer;
