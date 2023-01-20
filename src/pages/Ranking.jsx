import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logoTrivia from '../assets/imgs/logoTrivia.png';
import iconStar from '../assets/imgs/iconStar.png';

export default class Ranking extends Component {
  render() {
    const { history } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const sortRanking = !ranking ? [] : ranking.sort((a, b) => b.score - a.score);
    return (
      <div className="rankingContainer">
        <div className="rankingLogoTriviaContainer">
          <img className="rankingLogoTrivia" src={ logoTrivia } alt="logo trivia" />
        </div>
        <div className="rankingBox">
          <div data-testid="ranking-title" className="rankingText">Ranking</div>
          <div className="peopleRanking">
            {
              sortRanking.map((e, index) => (
                <div
                  key={ `RankingPessoa${e.name}#${index}` }
                  className="rankingDiv"
                >
                  <img
                    src={ e.picture }
                    alt={ `Foto da pessoa usuária: ${e.name}` }
                    className="userImgRanking"
                  />
                  <p className="rankingName">
                    <span data-testid={ `player-name-${index}` }>{e.name}</span>
                  </p>
                  <div className="rankingDivScore">
                    <p className="rankingScore">
                      <img src={ iconStar } alt="star icon" className="rankingStar" />
                      <span
                        data-testid={ `player-score-${index}` }
                        className="rankingScoreNumber"
                      >
                        {e.score}
                      </span>
                      {' pontos'}
                    </p>
                  </div>
                </div>

              ))
            }
          </div>
          <button
            type="button"
            onClick={ () => history.push('/') }
            data-testid="btn-go-home"
            className="btnRankingPlayAgain"
          >
            Jogar Novamente
          </button>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.func,
}.isRequired;
