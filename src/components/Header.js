import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    const despesas = 0;
    return (
      <div>
        <h5 data-testid="email-field">{ email }</h5>
        <h4 data-testid="total-field">{`Despesas totais: ${despesas}`}</h4>
        <h5 data-testid="header-currency-field">BRL</h5>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  email: user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
