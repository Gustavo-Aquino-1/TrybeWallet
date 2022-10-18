import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ImProfile } from 'react-icons/im';
import { actionGetEmail } from '../redux/actions';
import LoginArea from '../styles/styleLogin';

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
      <LoginArea>
        <div>
          <p>.</p>
          <section>
            <article>
              <h2>Welcome To TrybeWallet</h2>
            </article>
            <div className="loginArea">
              <span><ImProfile /></span>
              <input
                type="email"
                data-testid="email-input"
                value={ email }
                placeholder="Email"
                onChange={ ({ target: { value } }) => this.setState({ email: value }) }
              />

              <input
                type="password"
                data-testid="password-input"
                placeholder="Password"
                value={ password }
                onChange={ ({ target: { value } }) => this.setState({ password: value }) }
              />

              <button
                type="button"
                disabled={ !cond }
                onClick={ () => this.handleClick(email) }
              >
                Sing in
              </button>
            </div>
          </section>
        </div>
      </LoginArea>
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
