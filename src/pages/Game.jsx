import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Loading } from '../components/Loading';
import GameQuestions from '../components/GameQuestions';
import Header from '../components/Header';

class Game extends Component {
  componentDidMount() {
    const { history, responseCode } = this.props;
    if (responseCode !== 0) {
      localStorage.removeItem('token');
      history.push('/');
    }
  }

  render() {
    const { isFetching, currentQuestion } = this.props;
    return (
      <div>
        <Header />
        <div className="gameBodyContainer">
          {
            isFetching
              ? <Loading />
              : (
                <GameQuestions
                  key={ `CurrentQuestion-${currentQuestion}` }
                />
              )
          }
        </div>
        <div className="gameFooter" />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.questionsReducer.isFetching,
  responseCode: state.questionsReducer.questions.response_code,
  currentQuestion: state.questionsReducer.currentQuestion,
});

Game.propTypes = {
  score: PropTypes.number,
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Game);
