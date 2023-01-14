import { LOGIN_ACTION, UPDATE_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_SCORE:
    return {
      ...state,
      assertions: state.assertions + 1,
      score: state.score + action.score,
    };
  case LOGIN_ACTION:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
      assertions: 0,
      score: 0,
    };
  default: return state;
  }
};

export default player;
