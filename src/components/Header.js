import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  calculaDespesas = () => {
    const { expenses } = this.props;
    if (expenses.length > 0) {
      const sum = expenses.reduce((acc, cur) => {
        const currencyName = cur.currency;
        const aksCurrency = cur.exchangeRates[currencyName].ask; // conchetes pois é uma variavel e nao um codigo fixo
        const value = Number(aksCurrency) * Number(cur.value);
        return acc + Number(value);
      }, 0);
      return Number(sum).toFixed(2);
    }
    return 0;
  };

  render() {
    const { email } = this.props;
    const despesas = this.calculaDespesas();
    return (
      <div>
        <h5 data-testid="email-field">{ email }</h5>
        <h4 data-testid="total-field">{despesas}</h4>
        <h5 data-testid="header-currency-field">BRL</h5>
      </div>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps)(Header);
