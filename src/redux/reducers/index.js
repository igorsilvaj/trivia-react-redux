import { combineReducers } from 'redux';
import timerReducer from './timerReducer';
import questionsReducer from './questionsReducer';
import player from './playerReducer';
import nextButtonReducer from './nextButtonReducer';

const rootReducer = combineReducers({
  questionsReducer,
  timerReducer,
  player,
  nextButtonReducer,
});

export default rootReducer;
