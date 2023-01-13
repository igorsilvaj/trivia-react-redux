import { TIMER_ACTION, UPDATING_TIMER } from '../actions';

const INITIAL_STATE = {
  timerStopped: 30,
  timer: 30,
};

const timerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TIMER_ACTION:
    return { ...state, timerStopped: action.time };
  case UPDATING_TIMER:
    return { ...state, timer: action.time };
  default: return state;
  }
};

export default timerReducer;
