import { MD5 } from 'crypto-js';

export const requestTokenTrivia = async () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const request = await fetch(URL);
  const response = await request.json();
  localStorage.setItem('token', response.token);
  return response;
};

export const requestTriviaQuestions = async () => {
  const token = localStorage.getItem('token');
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const request = await fetch(URL);
  const data = await request.json();
  return data;
};

export const userImg = (email) => `https://www.gravatar.com/avatar/${MD5(email).toString()}`;
