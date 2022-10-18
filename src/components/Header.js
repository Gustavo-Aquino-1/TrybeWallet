import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import { FaCoins } from 'react-icons/fa';
import { BsPersonBadge } from 'react-icons/bs';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const HeaderArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin: auto;
  background-color: royalblue;
  padding: 10px 0;
  color: white;
  margin-bottom: 30px;
  div {
    display: flex;
    align-items: center;
    span {
      font-size: 30px;
      margin-right: 10px;
    }
    &:nth-child(3) {
      span {
        font-size: 25px;
      }
    }
  }
`;

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
      <HeaderArea>
        <div>
          <span><RiMoneyDollarCircleFill /></span>
          {' '}
          <p>TrybeWallet</p>
        </div>
        {/* <h5 data-testid="header-currency-field">BRL</h5> */}
        <div>
          <span><BsPersonBadge /></span>
          <h5 data-testid="email-field">{ email }</h5>
        </div>
        <div>
          <span><FaCoins /></span>
          <h4 data-testid="total-field">{`Despesas: ${Number(despesas).toFixed(2)}`}</h4>
        </div>
      </HeaderArea>
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
