import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { timerUpdate } from '../redux/actions';
import { connect } from 'react-redux';

class GameQuestions extends Component {
  state = {
    correct: '',
    incorrect: '',
    isDisabled: false,
  };

  componentDidMount() {
    console.log('Mount');
    const thousand = 1000;
    this.interval = setInterval(() => {
      this.funcaoTesteDoTimer();
    }, thousand);
  }

  // componentDidUpdate() {
  //   const { timer } = this.props;
  //   console.log(timer);
  // if (timer === 0) this.changeClass();
  // }

  funcaoTesteDoTimer = () => {
    const { timer } = this.props;
    if (timer === 0) this.changeClass();
    console.log(timer);
    if (timer === 0) {
      clearInterval(this.interval);
      this.setState({ isDisabled: true });
    }
  };

  handleClick = () => {
    clearInterval(this.interval);
    // const { dispatch } = this.props;
    // dispatch(timerUpdate());
    this.changeClass();
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
              onClick={ () => this.handleClick() }
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
  // dispatch: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  question: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    type: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  answers: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(GameQuestions);
