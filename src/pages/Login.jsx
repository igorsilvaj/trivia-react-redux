import React, { Component } from 'react';
// só para ter algo para adicionar
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

  render() {
    const { name, email, btnDisabled } = this.state;
    return (
      <div>
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
      </div>
    );
  }
}

export default Login;
