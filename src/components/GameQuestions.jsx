import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { nextButton, nextQuestion, resetTimer,
  stopTimer, updateScore } from '../redux/actions';
import Timer from './Timer';
import logoTrybe from '../assets/imgs/logoTrybe.png';
import logoTrivia from '../assets/imgs/logoTrivia.png';
import { userImg } from '../helpers/fetch';

function GameQuestions(props) {
  const { nextBtn, name, score,
    gravatarEmail, questions, currentQuestion, answers, timer, dispatch } = props;
  const [correct, setCorrect] = useState('');
  const [incorrect, setIncorrect] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [btnClick, setBtnClick] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  });

  const history = useHistory();

  const changeClass = (target) => {
    setCorrect('correct');
    setIncorrect('incorrect');
    if (target) target.classList.add('selected');
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
    return ten + (timer * dif[currDif]);
  };

  const handleClick = ({ target }) => {
    if (!target.name.includes('incorrect')) dispatch(updateScore(calcScore()));
    dispatch(stopTimer(timer));
    changeClass(target);
    const position = target.name.split('-')[1];
    // console.log(btnClick[position]);
    setBtnClick({ ...btnClick, [position]: true });
    dispatch(nextButton(false));
  };

  const nextQuestionBtnClick = () => {
    if (currentQuestion === questions.length - 1) {
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      if (!ranking) {
        localStorage.setItem('ranking', JSON.stringify([{
          name,
          score,
          picture: userImg(gravatarEmail),
        }]));
      } else {
        localStorage.setItem('ranking', JSON.stringify([...ranking, {
          name,
          score,
          picture: userImg(gravatarEmail),
        }]));
      }
      history.push('/feedback');
    } else {
      dispatch(resetTimer());
      dispatch(nextQuestion());
    }
    setBtnClick({
      1: false,
      2: false,
      3: false,
      4: false,
    });
  };

  return (
    <div className="questionContainer">
      <div className="question">
        <img className="gameLogoTrivia" src={ logoTrivia } alt="logo trivia" />
        <div className="questionCategoryBox">
          <p data-testid="question-category">
            {questions[currentQuestion].category}
          </p>
        </div>
        <div className="questionBox">
          <p
            data-testid="question-text"
            className="questionText"
          >
            {questions[currentQuestion].question}
          </p>
        </div>
        <Timer key={ `CurrentTimer-${currentQuestion}` } />
        <img className="gameLogoTrybe" src={ logoTrybe } alt="logo trybe" />
      </div>
      <div className="answer">
        <div data-testid="answer-options" className="answerContainer">
          {answers[currentQuestion].map((e, index) => (
            <button
              type="button"
              name={ `${e.type}-${index}` }
              disabled={ isDisabled }
              data-testid={
                e.type === 'incorrect'
                  ? `wrong-answer-${index}`
                  : 'correct-answer'
              }
              key={ `${index}-question` }
              onClick={ handleClick }
              className={ `btnAnswer ${e.type === 'incorrect'
                ? incorrect
                : correct} ${
                btnClick[index]
                  ? 'selected'
                  : ''
              }` }
            >
              {e.text}
              <div
                className={
                  `showAnswer answer${e.type === 'incorrect'
                    ? incorrect
                    : correct}`
                }
              />
            </button>
          ))}
        </div>
      </div>
      {!nextBtn && (
        <button
          data-testid="btn-next"
          type="button"
          onClick={ () => nextQuestionBtnClick() }
          className="btnNextQuestion"
        >
          Pr??xima
        </button>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
  timer: state.timerReducer.timer,
  currentQuestion: state.questionsReducer.currentQuestion,
  questions: state.questionsReducer.questions.results,
  answers: state.questionsReducer.answers,
  nextBtn: state.questionsReducer.isBtnDisabled,
});

GameQuestions.propTypes = {
  nextBtn: PropTypes.bool,
  dispatch: PropTypes.func,
  timer: PropTypes.number,
  questions: PropTypes.shape({}),
  currentQuestion: PropTypes.number,
  answers: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape())),
}.isRequired;

export default connect(mapStateToProps)(GameQuestions);
