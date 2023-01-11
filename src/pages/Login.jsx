import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import { requestTokenTrivia } from '../APIs/fetch';
// import { requestToken } from '../redux/actions';

class Login extends Component {
  state = {
    name: '',
    email: '',
    btnDisabled: false,
    // isLoading: false, fazer um componente de loading para renderizar enquanto a API não responde.
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.handleBtnDisabled);
  };

  handleBtnDisabled = () => {
    const { name, email } = this.state;
    const re = /\S+@\S+\.\S+/;
    const TREEH = 3;
    const emailValid = re.test(email);
    const nameValid = name.length >= TREEH;
    this.setState({ btnDisabled: emailValid && nameValid });
  };

  handlePlayBtn = async () => {
    const { history } = this.props;
    await requestTokenTrivia();
    history.push('/game');
  };

  handleSettingsBtn = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { name, email, btnDisabled } = this.state;
    return (
      <div className="App-header">
        <header>
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
        </header>
        <label htmlFor="email">
          Email:
          <input
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            id="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="name">
          Nome:
          <input
            data-testid="input-player-name"
            type="text"
            name="name"
            id="name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ !btnDisabled }
          data-testid="btn-play"
          onClick={ this.handlePlayBtn }
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleSettingsBtn }
        >
          Configurações
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.func,
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
