import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
// import tokenReducer from './tokenReducer';
import timerReducer from './timerReducer';
import questionsReducer from './questionsReducer';
import player from './playerReducer';
import nextButtonReducer from './nextButtonReducer';

const rootReducer = combineReducers({
  loginReducer,
  questionsReducer,
  timerReducer,
  player,
  nextButtonReducer,
});

export default rootReducer;
