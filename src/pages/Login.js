import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionGetEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleClick = (email) => {
    const { getEmail, history } = this.props;
    getEmail(email);
    history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;

    const regExpEmail = /\S+[@]\w+[.]\w+/gm;
    const minLength = 6;
    const cond = (regExpEmail.test(email) && password.length >= minLength);
    return (
      <div>
        <input
          type="email"
          data-testid="email-input"
          value={ email }
          onChange={ ({ target: { value } }) => this.setState({ email: value }) }
        />

        <input
          type="password"
          data-testid="password-input"
          value={ password }
          onChange={ ({ target: { value } }) => this.setState({ password: value }) }
        />

        <button
          type="button"
          disabled={ !cond }
          onClick={ () => this.handleClick(email) }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getEmail: (email) => dispatch(actionGetEmail(email)),
});

Login.propTypes = {
  getEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
