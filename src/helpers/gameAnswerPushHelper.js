const gameAnswerPushHelper = (array, wrongAns, correctAns) => {
  // answerMap
  // questions[currentQuestion].incorrect_answers
  // questions[currentQuestion].correct_answer
  array.push(
    ...wrongAns.map((e) => ({
      text: e,
      type: 'incorrect',
    })),
    {
      text: correctAns,
      type: 'correct',
    },
  );
};

export default gameAnswerPushHelper;
