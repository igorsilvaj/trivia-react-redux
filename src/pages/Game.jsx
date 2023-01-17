import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userImg } from '../helpers/fetch';
import { Loading } from '../components/Loading';
import Timer from '../components/Timer';
import GameQuestions from '../components/GameQuestions';
import { nextQuestion } from '../redux/actions';

class Game extends Component {
  componentDidMount() {
    const { history, responseCode } = this.props;
    if (responseCode !== 0) {
      localStorage.removeItem('token');
      history.push('/');
    }
  }

  nextQuestion() {
    const { history, name, score, gravatarEmail, dispatch,
      currentQuestion, questions } = this.props;
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
      dispatch(nextQuestion());
    }
  }

  render() {
    const { name, gravatarEmail, score, isFetching, nextBtn,
      currentQuestion } = this.props;
    return (
      <div className="gameContainer">
        <div className="gameHeader">
          <img
            src={ userImg(gravatarEmail) }
            alt={ `Foto da pessoa usuária: ${name}` }
            data-testid="header-profile-picture"
          />
          <span data-testid="header-player-name">{name}</span>
          <p>
            {'Pontuação: '}
            <span data-testid="header-score">{score}</span>
          </p>
        </div>
        <div className="gameBody">
          {
            isFetching
              ? <Loading />
              : (
                <>
                  <Timer key={ `CurrentTimer-${currentQuestion}` } />
                  <GameQuestions key={ `CurrentQuestion-${currentQuestion}` } />
                </>
              )
          }
          {!nextBtn && (
            <button
              data-testid="btn-next"
              type="button"
              onClick={ () => this.nextQuestion() }
            >
              Próxima pergunta
            </button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
  isFetching: state.questionsReducer.isFetching,
  responseCode: state.questionsReducer.questions.response_code,
  currentQuestion: state.questionsReducer.currentQuestion,
  questions: state.questionsReducer.questions.results,
  nextBtn: state.questionsReducer.isBtnDisabled,
});

Game.propTypes = {
  nextBtn: PropTypes.bool,
  score: PropTypes.number,
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Game);
