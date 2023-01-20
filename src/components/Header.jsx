import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userImg } from '../helpers/fetch';
import iconStar from '../assets/imgs/iconStar.png';
import engine from '../assets/imgs/engine.png';

function Header(props) {
  const { name, gravatarEmail, score } = props;
  return (
    <div className="gameHeaderContainer">
      <div className="headerDisplayInfos">
        <div className="userImgAndName">
          <img
            src={ userImg(gravatarEmail) }
            alt={ `Foto da pessoa usuária: ${name}` }
            data-testid="header-profile-picture"
            className="gravatarUserImg"
          />
          <span data-testid="header-player-name" className="userName">{name}</span>
        </div>
        <div className="score">
          <img src={ iconStar } alt="star icon" className="star" />
          <p className="scoreText">Pontos:</p>
          <span
            data-testid="header-score"
            className="scoreNumber"
          >
            {score}
          </span>
        </div>
        <div>
          <img src={ engine } alt="engine icon" />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

Header.propTypes = {
  score: PropTypes.number,
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
