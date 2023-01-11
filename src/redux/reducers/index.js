import { combineReducers } from 'redux';
import loginReducer from './login';
import tokenReducer from './tokenReducer';

const rootReducer = combineReducers({
  loginReducer,
  tokenReducer,
});

export default rootReducer;
