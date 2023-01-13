import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class GameQuestions extends Component {
  state = {
    correct: '',
    incorrect: '',
  };

  changeClass() {
    this.setState({ correct: 'correct', incorrect: 'incorrect' });
  }

  render() {
    const {
      question,
      answers,
    } = this.props;
    const { correct, incorrect } = this.state;
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
              data-testid={
                e.type === 'incorrect'
                  ? `wrong-answer-${index}`
                  : 'correct-answer'
              }
              key={ `${index}-question` }
              onClick={ () => this.changeClass() }
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

GameQuestions.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    type: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  answers: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
