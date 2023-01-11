import { requestTokenTrivia } from '../../APIs/fetch';

export const LOGIN_ACTION = 'LOGIN_ACTION';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';

export const login = () => ({
  type: LOGIN_ACTION,
});

const getToken = async () => {
  const data = await requestTokenTrivia();
  return data;
};

export const requestToken = () => ({
  type: REQUEST_TOKEN,
  payload: getToken(),
});
