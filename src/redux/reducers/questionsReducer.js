import shuffleArray from '../../helpers/shuffleArray';
import { START_REQUEST, SUCESS_REQUEST,
  FAIL_REQUEST, NEXT_BUTTON, NEXT_QUESTION } from '../actions';

const initialState = {
  questions: {
    response_code: 3,
    results: [],
  },
  currentQuestion: 0,
  answers: [],
  isFetching: true,
  isBtnDisabled: true,
};

const answersHelper = (questions) => {
  const answers = [];
  questions.map((question) => {
    const correctA = {
      text: question.correct_answer,
      type: 'correct',
    };
    const wrongA = question.incorrect_answers.map((answer) => ({
      text: answer,
      type: 'incorrect',
    }));
    return answers.push(shuffleArray([correctA, ...wrongA]));
  });
  return answers;
};

const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
  case START_REQUEST:
    return { ...state, isFetching: true };
  case SUCESS_REQUEST:
    return {
      ...state,
      questions: action.questions,
      isFetching: false,
      currentQuestion: 0,
      answers: answersHelper(action.questions.results),
    };
  case FAIL_REQUEST:
    return { ...state };
  case NEXT_BUTTON:
    return { ...state, isBtnDisabled: action.payload };
  case NEXT_QUESTION:
    return {
      ...state,
      currentQuestion: state.currentQuestion + 1,
      isBtnDisabled: true };
  default: return state;
  }
};

export default questionsReducer;
