import { UPDATE_TIMER, STOP_TIMER, RESET_TIMER } from '../actions';

const INITIAL_STATE = {
  timer: 30,
  timerStopped: 0,
};

const timerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_TIMER:
    return { ...state, timer: action.time };
  case STOP_TIMER:
    return { timer: 0, timerStopped: action.time };
  case RESET_TIMER:
    return { timer: 30, timerStopped: 0 };
  default: return state;
  }
};

export default timerReducer;
