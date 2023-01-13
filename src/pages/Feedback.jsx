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
    const { name, gravatarEmail, score } = this.props;
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
