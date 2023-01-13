import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { timerUpdate, updateScore, nextButton } from '../redux/actions';

class GameQuestions extends Component {
  state = {
    correct: '',
    incorrect: '',
    isDisabled: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    console.log('Mount');
    const thousand = 1000;
    this.interval = setInterval(() => {
      this.funcaoTesteDoTimer();
    }, thousand);
    dispatch(nextButton(true));
  }

  // componentDidUpdate() {
  //   const { timer } = this.props;
  //   console.log(timer);
  // if (timer === 0) this.changeClass();
  // }

  funcaoTesteDoTimer = () => {
    const { timer } = this.props;
    if (timer === 0) this.changeClass();
    if (timer === 0) {
      clearInterval(this.interval);
      this.setState({ isDisabled: true });
    }
  };

  handleClick = (event) => {
    clearInterval(this.interval);
    const { target } = event;
    const { name } = target;
    const { dispatch, timer } = this.props;
    if (name === 'correct') dispatch(updateScore(this.calcScore()));
    dispatch(timerUpdate(timer));
    this.changeClass();
    dispatch(nextButton(false));
  };

  calcScore = () => {
    const { timer, question } = this.props;
    const ten = 10;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    let questionDif = 0;
    if (question.difficulty === 'hard') {
      questionDif = hard;
    } else if (question.difficulty === 'medium') {
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
    const {
      question,
      answers,
    } = this.props;
    const { correct, incorrect, isDisabled } = this.state;
    return (
      <div className="questionContainer">
        <p data-testid="question-category">
          {question.category}
        </p>
        <p data-testid="question-text">{question.question}</p>
        <div data-testid="answer-options" className="answerContainer">
          {answers.map((e, index) => (
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
});

GameQuestions.propTypes = {
  dispatch: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  question: PropTypes.shape({
    difficulty: PropTypes.string,
    category: PropTypes.string,
    question: PropTypes.string,
    type: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  answers: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(GameQuestions);
