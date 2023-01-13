import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userImg, getQuestions } from '../APIs/fetch';
import { Loading } from '../components/Loading';
import GameQuestions from '../components/GameQuestions';
import shuffleArray from '../helpers/shuffleArray';
import Timer from '../components/Timer';

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
    const { name, gravatarEmail, score } = this.props;
    const {
      questions,
      currentQuestion,
      isLoading,
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
          src={ userImg(gravatarEmail) }
          alt={ `Foto da pessoa usuária: ${name}` }
          data-testid="header-profile-picture"
        />
        <span data-testid="header-player-name">{name}</span>
        <p>
          Score:
          <span data-testid="header-score">{ score }</span>
        </p>
        {
          isLoading ? (<Loading />) : (
            <>
              <Timer key={ `timer ${currentQuestion}` } />
              <GameQuestions
                key={ currentQuestion }
                question={ questions[currentQuestion] }
                answers={ rAnswer }
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
  gravatarEmail: state.loginReducer.gravatarEmail,
  score: state.player.score,
});

Game.propTypes = {
  score: PropTypes.number,
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Game);
