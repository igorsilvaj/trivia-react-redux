export const requestTokenTrivia = async () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const request = await fetch(URL);
  const response = await request.json();
  localStorage.setItem('token', response.token);
  return response.token;
};

export const requestTriviaQuestions = async () => {
  const response = localStorage.getItem('token');
  const URL = `https://opentdb.com/api.php?amount=5&token=${response}`;
  const request = await fetch(URL);
  const data = await request.json();
  return data;
};
