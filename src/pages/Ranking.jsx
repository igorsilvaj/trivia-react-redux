import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Ranking extends Component {
  render() {
    const { history } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const sortRanking = !ranking ? [] : ranking.sort((a, b) => b.score - a.score);
    return (
      <>
        <div data-testid="ranking-title">Ranking</div>
        <div>
          {
            sortRanking.map((e, index) => (
              <div key={ `RankingPessoa${e.name}#${index}` }>
                <img
                  src={ e.picture }
                  alt={ `Foto da pessoa usuária: ${e.name}` }
                />
                <p><span data-testid={ `player-name-${index}` }>{e.name}</span></p>
                <p><span data-testid={ `player-score-${index}` }>{e.score}</span></p>
              </div>

            ))
          }
        </div>
        <button
          type="button"
          onClick={ () => history.push('/') }
          data-testid="btn-go-home"
        >
          Jogar Novamente
        </button>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.func,
}.isRequired;
