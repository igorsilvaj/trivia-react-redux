import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../assets/imgs/logoTrivia.png';
import { requestTokenTrivia } from '../helpers/fetch';
import { login, requestQuestions, resetTimer } from '../redux/actions';
import { Loading } from '../components/Loading';

class Login extends Component {
  state = {
    name: '',
    email: '',
    btnDisabled: false,
    isLoading: false,
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
    const { history, dispatch } = this.props;
    const { name, email } = this.state;
    const requestTimeout = 1000;
    await requestTokenTrivia();
    this.setState({ isLoading: true });
    dispatch(login(name, email));
    dispatch(requestQuestions());
    dispatch(resetTimer());
    setTimeout(() => {
      this.setState({ isLoading: false });
      history.push('/game');
    }, requestTimeout);
  };

  handleSettingsBtn = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { name, email, btnDisabled, isLoading } = this.state;
    return (
      <div className="loginContainer">
        { isLoading && <Loading />}
        <header>
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <div className="loginForm">
          <input
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            id="email"
            value={ email }
            onChange={ this.handleChange }
            placeholder="Qual é o seu e-mail do gravatar?"
            className="inputLogin"
          />
          <input
            data-testid="input-player-name"
            type="text"
            name="name"
            id="name"
            value={ name }
            onChange={ this.handleChange }
            placeholder="Qual é o seu nome?"
            className="inputLogin"
          />
          <button
            type="button"
            disabled={ !btnDisabled }
            data-testid="btn-play"
            onClick={ this.handlePlayBtn }
            className="btnPlay"
          >
            JOGAR
          </button>
        </div>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleSettingsBtn }
          className="btnSettings"
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
