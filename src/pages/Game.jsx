import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userImg, getQuestions } from '../APIs/fetch';
import { Loading } from '../components/Loading';
import shuffle from '../helpers/shuffleArray';
import gameAnswerPushHelper from '../helpers/gameAnswerPushHelper';

class Game extends Component {
  state = {
    questions: [],
    currentQuestion: 0,
    isLoading: true,
    disabledColorWrong: '',
    disabledColorCorrect: '',
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

  handleClick() {
    // target.classList.add(target.name === 'incorrect' ? 'incorrect' : 'correct');
    console.log('test');
    this.setState({ disabledColorWrong: 'incorrect', disabledColorCorrect: 'correct' });
  }

  render() {
    const { name, email } = this.props;
    const { questions, currentQuestion, isLoading,
      disabledColorWrong, disabledColorCorrect } = this.state;
    let answerMap = [];
    const lastNuber = 0;
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
            </p>
            <div data-testid="answer-options" className="answerContainer">
              {gameAnswerPushHelper(
                answerMap,
                questions[currentQuestion].incorrect_answers,
                questions[currentQuestion].correct_answer,
              )}
              {shuffle(answerMap)}
              {answerMap.map((e, index) => {
                const random = Math.floor(Math.random() * answerMap.length);
                const randomTest = random === lastNuber
                  ? Math.floor(Math.random() * answerMap.length)
                  : random;
                const answer = answerMap[randomTest];
                answerMap = answerMap.filter((el) => el.text !== answer.text);
                return (
                  <button
                    type="button"
                    name={ e.type }
                    data-testid={
                      e.type === 'incorrect'
                        ? `wrong-answer-${index}`
                        : 'correct-answer'
                    }
                    key={ `${index}-question` }
                    onClick={ () => this.handleClick() }
                    className={ e.type === 'incorrect'
                      ? disabledColorWrong
                      : disabledColorCorrect }
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
