import { getToken } from '../../APIs/fetch';

export const LOGIN_ACTION = 'LOGIN_ACTION';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';

export const login = (name, email, img) => ({
  type: LOGIN_ACTION,
  name,
  email,
  img,
});

export const requestToken = () => ({
  type: REQUEST_TOKEN,
  payload: getToken(),
});
