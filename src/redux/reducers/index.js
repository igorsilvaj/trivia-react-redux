import { combineReducers } from 'redux';
import timerReducer from './timerReducer';
import questionsReducer from './questionsReducer';
import player from './playerReducer';

const rootReducer = combineReducers({
  questionsReducer,
  timerReducer,
  player,
});

export default rootReducer;
