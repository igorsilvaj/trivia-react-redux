import { NEXT_BUTTON } from '../actions';

const initialState = {
  isDisable: true,
};

const nextButtonReducer = (state = initialState, action) => {
  switch (action.type) {
  case NEXT_BUTTON:
    return { ...state, isDisable: action.payload };
  default: return state;
  }
};

export default nextButtonReducer;
