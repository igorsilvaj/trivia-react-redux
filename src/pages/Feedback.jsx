/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userImg } from '../helpers/fetch';
import logoTrivia from '../assets/imgs/logoTrivia.png';

const three = 3;

class Feedback extends Component {
  feedbackResult = () => {
    const { assertions } = this.props;
    const feedbackMsg = assertions >= three ? 'MANDOU BEM!' : 'PODIA SER MELHOR...';
    return feedbackMsg;
  };

  render() {
    const { name, gravatarEmail, score, assertions, history } = this.props;
    const feedbackResult = this.feedbackResult();
    return (
      <div className="feedbackContainer">
        {/* <div data-testid="feedback-text">Feedback</div> */}
        <div className="feedbackLogoTriviaContainer">
          <img className="feedbackLogoTrivia" src={ logoTrivia } alt="logo trivia" />
          <img
            data-testid="header-profile-picture"
            src={ userImg(gravatarEmail) }
            alt={ `Foto da pessoa usuária: ${name}` }
            className={ `feedbackUserImg ${assertions >= three
              ? 'goodJob' : 'couldBeBetter'}` }
          />
        </div>
        <div className="feedbackMessageContainer">
          <div className="feedbackMessage">
            {/* <span
                data-testid="header-player-name"
              >
                { name }
              </span>
              <p>
                Score:
                <span
                  data-testid="header-score"
                >
                  { score }
                </span>
              </p> */}
            <p
              data-testid="feedback-text"
              className={ assertions >= three
                ? 'goodJobText' : 'couldBeBetterText' }
            >
              { feedbackResult }
            </p>
            {assertions === 0
              ? <p className="grayText">Você não acertou nenhuma questão!</p>
              : (
                <p className="grayText">
                  {'Você acertou '}
                  <span data-testid="feedback-total-question">{ assertions }</span>
                  {assertions > 1 ? ' questões!' : ' questão!'}
                </p>
              )}
            <p className="grayText">
              {'Um total de '}
              <span data-testid="feedback-total-score">{ score }</span>
              {' pontos!'}
            </p>
          </div>
        </div>
        <div className="feedbackBtnContainer">
          <button
            type="button"
            onClick={ () => history.push('/ranking') }
            data-testid="btn-ranking"
            className="btnFeedbackRanking"
          >
            VER RANKING
          </button>
          <button
            data-testid="btn-play-again"
            type="button"
            onClick={ () => history.push('/') }
            className="btnFeedbackPlayAgain"
          >
            JOGAR NOVAMENTE
          </button>
        </div>
        <footer className="feedbackFooter" />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  history: PropTypes.func,
  assertions: PropTypes.number,
  score: PropTypes.number,
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
