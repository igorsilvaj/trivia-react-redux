import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userImg, getQuestions } from '../APIs/fetch';
import { Loading } from '../components/Loading';
import shuffle from '../helpers/shuffleArray';

class Game extends Component {
  state = {
    questions: [],
    currentQuestion: 0,
    isLoading: true,
  };

  async componentDidMount() {
    const { history } = this.props;
    const request = await getQuestions();
    if (request.response_code !== 0) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState({ questions: request.results, isLoading: false });
    }
  }

  render() {
    const { name, email } = this.props;
    const { questions, currentQuestion, isLoading } = this.state;
    // const classNameList = ['one', 'two', 'three', 'four'];
    let answerMap = [];
    return (
      <div>
        <img
          src={ userImg(email) }
          alt={ `Foto da pessoa usuária: ${name}` }
          data-testid="header-profile-picture"
        />
        <span data-testid="header-player-name">{name}</span>
        <span data-testid="header-score">0</span>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="questionContainer">
            <p data-testid="question-category">
              {questions[currentQuestion].category}
            </p>
            <p data-testid="question-text">
              {questions[currentQuestion].question}
              {
                answerMap.push(
                  ...questions[currentQuestion].incorrect_answers.map((e) => ({
                    text: e,
                    type: 'incorrect',
                  })),
                  {
                    text: questions[currentQuestion].correct_answer,
                    type: 'correct',
                  },
                )
              }
            </p>
            <div data-testid="answer-options" className="answerContainer">

              {shuffle(answerMap)}
              {answerMap.map((e, index) => {
                const random = Math.floor(Math.random() * answerMap.length);
                const answer = answerMap[random];
                answerMap = answerMap.filter((el) => el.text !== answer.text);
                return (
                  <button
                    type="button"
                    data-testid={
                      e.type === 'incorrect'
                        ? `wrong-answer-${index}`
                        : 'correct-answer'
                    }
                    key={ `${index}-question` }
                  >
                    {e.text}
                  </button>
                );
              })}
            </div>
            <button type="button">Próxima pergunta</button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.loginReducer.name,
  email: state.loginReducer.email,
});

Game.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Game);
