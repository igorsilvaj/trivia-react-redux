import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Ranking extends Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <div data-testid="ranking-title">Ranking</div>
        <button
          type="button"
          onClick={ () => history.push('/') }
          data-testid="btn-go-home"
        >
          Ranking
        </button>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.func,
}.isRequired;
