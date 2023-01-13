import { requestTriviaQuestions } from '../../APIs/fetch';

export const LOGIN_ACTION = 'LOGIN_ACTION';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const TIMER_ACTION = 'TIMER_ACTION';
export const UPDATING_TIMER = 'UPDATING_TIMER';

export const login = (name, email, img) => ({
  type: LOGIN_ACTION,
  name,
  email,
  img,
});

export const timerUpdate = (time) => ({
  type: TIMER_ACTION,
  time,
});

export const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
  payload: requestTriviaQuestions(),
});

export const updatingTimer = (time) => ({
  type: UPDATING_TIMER,
  time,
});
