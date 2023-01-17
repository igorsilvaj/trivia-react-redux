import { ACTION_TIMER, UPDATING_TIMER, RESET_TIMER } from '../actions';

const INITIAL_STATE = {
  timerStopped: 30,
  timer: 30,
};

const timerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTION_TIMER:
    return { ...state, timerStopped: action.time };
  case UPDATING_TIMER:
    return { ...state, timer: action.time };
  case RESET_TIMER:
    return { timerStopped: 30, timer: 30 };
  default: return state;
  }
};

export default timerReducer;
