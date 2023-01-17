import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionTimer, updateScore, nextButton, resetTimer } from '../redux/actions';

class GameQuestions extends Component {
  state = {
    correct: '',
    incorrect: '',
    isDisabled: false,
  };

  componentDidMount() {
    const thousand = 1000;
    this.interval = setInterval(() => {
      this.handleTimer();
    }, thousand);
  }

  handleTimer = () => {
    const { timer, dispatch } = this.props;
    if (timer === 0) {
      clearInterval(this.interval);
      this.changeClass();
      this.setState({ isDisabled: true });
      dispatch(resetTimer());
      dispatch(nextButton(false));
    }
  };

  handleClick = ({ target }) => {
    clearInterval(this.interval);
    const { name } = target;
    const { dispatch, timer } = this.props;
    if (name === 'correct') dispatch(updateScore(this.calcScore()));
    dispatch(actionTimer(timer));
    this.changeClass();
    dispatch(nextButton(false));
  };

  calcScore = () => {
    const { timer, questions, currentQuestion } = this.props;
    const ten = 10;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    let questionDif = 0;
    if (questions[currentQuestion].difficulty === 'hard') {
      questionDif = hard;
    } else if (questions[currentQuestion].difficulty === 'medium') {
      questionDif = medium;
    } else {
      questionDif = easy;
    }
    return ten + (timer * questionDif);
  };

  changeClass() {
    this.setState({ correct: 'correct', incorrect: 'incorrect' });
  }

  render() {
    const { questions, currentQuestion, answers } = this.props;
    const { correct, incorrect, isDisabled } = this.state;
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
              onClick={ this.handleClick }
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
