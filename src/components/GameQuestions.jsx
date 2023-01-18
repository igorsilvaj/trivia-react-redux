import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { nextButton, stopTimer, updateScore } from '../redux/actions';

function GameQuestions(props) {
  const { questions, currentQuestion, answers, timer, dispatch } = props;
  const [correct, setCorrect] = useState('');
  const [incorrect, setIncorrect] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const changeClass = () => {
    setCorrect('correct');
    setIncorrect('incorrect');
  };

  useEffect(() => {
    if (timer === 0) {
      changeClass();
      setIsDisabled(true);
      dispatch(nextButton(false));
    }
  }, [timer, dispatch]);

  const calcScore = () => {
    const ten = 10;
    const currDif = questions[currentQuestion].difficulty;
    const dif = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    // console.log('score:', ten + (time * dif[currDif]));
    return ten + (timer * dif[currDif]);
  };

  const handleClick = ({ target }) => {
    const { name } = target;
    if (name === 'correct') dispatch(updateScore(calcScore()));
    dispatch(stopTimer(timer));
    // console.log('stop');
    changeClass();
    dispatch(nextButton(false));
  };

  return (
    <div className="questionContainer">
      <p data-testid="question-category">
        {questions[currentQuestion].category}
      </p>
      <p data-testid="question-text">{questions[currentQuestion].question}</p>
      <div data-testid="answer-options" className="answerContainer">
        {answers[currentQuestion].map((e, index) => (
          <button
            type="button"
            name={ e.type }
            disabled={ isDisabled }
            data-testid={
              e.type === 'incorrect'
                ? `wrong-answer-${index}`
                : 'correct-answer'
            }
            key={ `${index}-question` }
            onClick={ handleClick }
            className={
              e.type === 'incorrect'
                ? incorrect
                : correct
            }
          >
            {e.text}
          </button>
        ))}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  timer: state.timerReducer.timer,
  currentQuestion: state.questionsReducer.currentQuestion,
  questions: state.questionsReducer.questions.results,
  answers: state.questionsReducer.answers,
});

GameQuestions.propTypes = {
  dispatch: PropTypes.func,
  timer: PropTypes.number,
  questions: PropTypes.shape({}),
  currentQuestion: PropTypes.number,
  answers: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape())),
}.isRequired;

export default connect(mapStateToProps)(GameQuestions);
