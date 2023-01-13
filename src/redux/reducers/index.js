import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
// import tokenReducer from './tokenReducer';
import timerReducer from './timerReducer';
import questionsReducer from './questionsReducer';
import player from './playerReducer';

const rootReducer = combineReducers({
  loginReducer,
  questionsReducer,
  timerReducer,
  player,
});

export default rootReducer;
