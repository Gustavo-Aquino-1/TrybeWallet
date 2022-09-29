import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi, fetchAndAddExpense } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { fetchCoins } = this.props;
    fetchCoins();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { value, description, currency, method, tag } = this.state;
    const { addExpense, numberId } = this.props;
    const obj = {
      id: numberId, value, currency, method, description, tag,
    };
    addExpense(obj);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { description, value, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <input
          type="number"
          data-testid="value-input"
          value={ value }
          name="value"
          onChange={ (e) => this.handleChange(e) }
        />

        <input
          type="text"
          data-testid="description-input"
          value={ description }
          name="description"
          onChange={ (e) => this.handleChange(e) }
        />

        <select
          data-testid="currency-input"
          value={ currency }
          name="currency"
          onChange={ (e) => this.handleChange(e) }
        >
          {
            currencies.map((e, index) => <option key={ index }>{e}</option>)
          }
        </select>

        <select
          data-testid="method-input"
          value={ method }
          name="method"
          onChange={ (e) => this.handleChange(e) }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>

        <select
          data-testid="tag-input"
          value={ tag }
          name="tag"
          onChange={ (e) => this.handleChange(e) }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>

        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar Despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  numberId: wallet.expenses.length,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCoins: () => dispatch(fetchApi()),
  addExpense: (expense) => dispatch(fetchAndAddExpense(expense)),
});

WalletForm.propTypes = {
  currencies: PropTypes.instanceOf(Array).isRequired,
  fetchCoins: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  numberId: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
