import { REQUEST_QUESTIONS } from '../actions';

const initialState = {
  questions: [],
};

const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return { ...state, questions: action.payload.results };
  default: return state;
  }
};

export default questionsReducer;
