import { combineReducers } from 'redux';
import loginReducer from './login';
// import tokenReducer from './tokenReducer';
import questionsReducer from './questionsReducer';

const rootReducer = combineReducers({
  loginReducer,
  // tokenReducer,
  questionsReducer,
});

export default rootReducer;
