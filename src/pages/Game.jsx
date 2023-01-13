import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userImg, getQuestions } from '../APIs/fetch';
import { Loading } from '../components/Loading';
import GameQuestions from '../components/GameQuestions';
import shuffleArray from '../helpers/shuffleArray';

class Game extends Component {
  state = {
    questions: [],
    currentQuestion: 0,
    isLoading: true,
    disabledColorCorrect: '',
    disabledColorIncorrect: '',
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

  nextQuestion() {
    const { currentQuestion, questions } = this.state;
    if (currentQuestion === questions.length - 1) {
      console.log('last question');
    } else {
      this.setState({
        currentQuestion: currentQuestion + 1,
      });
    }
  }

  render() {
    const { name, email } = this.props;
    const {
      questions,
      currentQuestion,
      isLoading,
      disabledColorIncorrect,
      disabledColorCorrect,
    } = this.state;
    let rAnswer = [];
    if (!isLoading) {
      const correctA = {
        text: questions[currentQuestion].correct_answer, type: 'correct' };
      const wrongA = questions[currentQuestion].incorrect_answers.map((e) => (
        { text: e, type: 'incorrect' }));
      rAnswer = shuffleArray([correctA, ...wrongA]);
    }
    return (
      <div>
        <img
          src={ userImg(email) }
          alt={ `Foto da pessoa usuária: ${name}` }
          data-testid="header-profile-picture"
        />
        <span data-testid="header-player-name">{name}</span>
        <p>
          Score:
          <span data-testid="header-score">{' 0'}</span>
        </p>
        {
          isLoading ? (<Loading />) : (
            <>
              <GameQuestions
                key={ currentQuestion }
                question={ questions[currentQuestion] }
                answers={ rAnswer }
                handleQuestionClick={ () => this.handleQuestionClick() }
                correct={ disabledColorCorrect }
                incorrect={ disabledColorIncorrect }
              />
              <button type="button" onClick={ () => this.nextQuestion() }>
                Próxima pergunta
              </button>
            </>
          )
        }
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
