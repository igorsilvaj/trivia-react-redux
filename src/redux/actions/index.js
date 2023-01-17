import { requestTriviaQuestions } from '../../helpers/fetch';

export const LOGIN_ACTION = 'LOGIN_ACTION';

export const ACTION_TIMER = 'ACTION_TIMER';
export const UPDATING_TIMER = 'UPDATING_TIMER';
export const RESET_TIMER = 'RESET_TIMER';

export const START_REQUEST = 'START_REQUEST';
export const SUCESS_REQUEST = 'SUCESS_REQUEST';
export const FAIL_REQUEST = 'FAIL_REQUEST';

export const UPDATE_SCORE = 'UPDATE_SCORE';

export const NEXT_BUTTON = 'NEXT_BUTTON';
export const NEXT_QUESTION = 'NEXT_QUESTION';

export const login = (name, email, img) => ({ type: LOGIN_ACTION, name, email, img });
export const actionTimer = (time) => ({ type: ACTION_TIMER, time });
export const updatingTimer = (time) => ({ type: UPDATING_TIMER, time });
export const resetTimer = () => ({ type: RESET_TIMER });
export const updateScore = (score) => ({ type: UPDATE_SCORE, score });
export const nextButton = (btn) => ({ type: NEXT_BUTTON, payload: btn });
export const startRequest = () => ({ type: START_REQUEST });
export const successfulRequest = (questions) => ({ type: SUCESS_REQUEST, questions });
export const failedRequest = (error) => ({ type: FAIL_REQUEST, error });
export function requestQuestions() {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      const questions = await requestTriviaQuestions();
      dispatch(successfulRequest(questions));
    } catch (error) {
      console.log(error);
      dispatch(failedRequest(error));
    }
  };
}
export const nextQuestion = () => ({ type: NEXT_QUESTION });
