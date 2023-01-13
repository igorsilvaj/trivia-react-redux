import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
// import tokenReducer from './tokenReducer';
import timerReducer from './timerReducer';
import questionsReducer from './questionsReducer';

const rootReducer = combineReducers({
  loginReducer,
  questionsReducer,
  timerReducer,
});

export default rootReducer;
