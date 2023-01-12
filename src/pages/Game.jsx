import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userImg, getQuestions } from '../APIs/fetch';

class Game extends Component {
  state = {
    questions: [],
  };

  async componentDidMount() {
    console.log('TesteDidMount');
    const request = await getQuestions();
    this.setState({ questions: request });
  }

  render() {
    const { name, email } = this.props;
    return (
      <div>
        <img
          src={ userImg(email) }
          alt={ `Foto da pessoa usuária: ${name}` }
          data-testid="header-profile-picture"
        />
        <span data-testid="header-player-name">{name}</span>
        <span data-testid="header-score">0</span>
        <div>
          <p data-testid="question-category"></p>
          <p data-testid="question-text"></p>
          
          <p data-testid="question-text"></p>
        </div>
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
