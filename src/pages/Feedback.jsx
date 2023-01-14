import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userImg } from '../APIs/fetch';

class Feedback extends Component {
  feedbackResult = () => {
    const { assertions } = this.props;
    const three = 3;
    const feedbackMsg = assertions >= three ? 'Well Done!' : 'Could be better...';
    return feedbackMsg;
  };

  render() {
    const { name, gravatarEmail, score, assertions, history } = this.props;
    const feedbackResult = this.feedbackResult();
    return (
      <>
        <div data-testid="feedback-text">Feedback</div>
        <img
          data-testid="header-profile-picture"
          src={ userImg(gravatarEmail) }
          alt={ `Foto da pessoa usuária: ${name}` }
        />
        <span
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
        </p>
        <p data-testid="feedback-text">{ feedbackResult }</p>
        <p>
          {'Um total de '}
          <span data-testid="feedback-total-score">{ score }</span>
          {' pontos!'}
        </p>
        <p>
          {'Você acertou '}
          <span data-testid="feedback-total-question">{ assertions }</span>
          {' questões!'}
        </p>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
        <button
          type="button"
          onClick={ () => history.push('/ranking') }
          data-testid="btn-ranking"
        >
          Ranking
        </button>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  name: state.loginReducer.name,
  gravatarEmail: state.loginReducer.gravatarEmail,
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
