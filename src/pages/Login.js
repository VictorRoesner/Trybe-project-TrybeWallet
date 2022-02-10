import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveLoginInput } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isRedirect: false,
      email: '',
      password: '',
      btnDisabled: true,
    };

    this.verifyLogin = this.verifyLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState(() => ({
      [name]: value,
    }), this.verifyLogin);
  }

  handleClick() {
    const { getLogin } = this.props;
    const { email } = this.state;
    getLogin(email);
    this.setState({ isRedirect: true });
  }

  // SRC = https://stackoverflow.com/questions/41348459/regex-in-react-email-validation
  verifyLogin() {
    const { email, password } = this.state;
    const minLength = 6;
    const checkEmail = /.+@.+\.[A-Za-z]+$/;

    if (password.length >= minLength && checkEmail.test(email)) {
      this.setState({ btnDisabled: false });
    } else {
      this.setState({
        btnDisabled: true,
      });
    }
  }

  render() {
    const { email, password, isRedirect, btnDisabled } = this.state;
    if (isRedirect) return <Redirect to="/carteira" />;
    return (
      <section>
        <label htmlFor="email">
          Email:
          <input
            data-testid="email-input"
            value={ email }
            type="text"
            id="email"
            name="email"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            data-testid="password-input"
            value={ password }
            type="password"
            id="password"
            name="password"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ btnDisabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getLogin: (state) => dispatch(saveLoginInput(state)),
});

Login.propTypes = {
  getLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
