import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../trivia.png';

// só para fazer o commit

class Login extends Component {
  state = {
    name: '',
    email: '',
    btnDisabled: false,
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
}.isRequired;

export default Login;
