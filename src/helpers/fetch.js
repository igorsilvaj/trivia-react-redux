import { MD5 } from 'crypto-js';
// import mockFetch from './mockFetch';

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
  // console.log(data);
  // const newData = data.results.map((e) => ({
  //   ...Object.entries(e).map((i) => ({ [i[0]]: i[1].replace(/&quot;/g, '"') })) }));
  // console.log(data);
  return data;
  // return mockFetch;
};

export const userImg = (email) => `https://www.gravatar.com/avatar/${MD5(email).toString()}`;
