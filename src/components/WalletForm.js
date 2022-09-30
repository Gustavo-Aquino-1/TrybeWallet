import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi, fetchAndAddExpense, actionEditExpense,
  actionActiveEditor } from '../redux/actions';

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

  clean = () => {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  getData = async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    return data;
  };

  handleClick = () => {
    const { value, description, currency, method, tag } = this.state;
    const { addExpense, expenses } = this.props;
    if (!expenses[0]) {
      const obj = {
        id: 0, value, currency, method, description, tag,
      };
      addExpense(obj);
    } else {
      const id = Number(expenses[expenses.length - 1].id) + 1;
      const obj = {
        id, value, currency, method, description, tag,
      };
      addExpense(obj);
    }
    this.clean();
  };

  editExpense = async () => {
    const { value, description, currency, method, tag } = this.state;
    const { idToEdit, expenses, editExpense, desactiveEditor } = this.props;
    const arrFilter = expenses.filter((e) => e.id !== idToEdit);
    const editObject = {
      id: idToEdit,
      description,
      currency,
      method,
      tag,
      value,
      exchangeRates: await this.getData(),
    };
    const attExpenses = [...arrFilter, editObject].sort((a, b) => +a.id - +b.id);
    editExpense(attExpenses);
    this.clean();
    desactiveEditor(0);
  };

  render() {
    const { description, value, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;
    return (
      <div>
        <input
          type="number"
          data-testid="value-input"
          value={ value }
          name="value"
          onChange={ (e) => this.handleChange(e) }
          placeholder="Value"
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

        {
          !editor ? (
            <button
              type="button"
              onClick={ this.handleClick }
            >
              Adicionar Despesa
            </button>
          ) : (
            <button
              type="button"
              onClick={ this.editExpense }
            >
              Editar Despesa
            </button>
          )
        }

      </div>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  expenses: wallet.expenses,
  editor: wallet.editor,
  idToEdit: wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCoins: () => dispatch(fetchApi()),
  addExpense: (expense) => dispatch(fetchAndAddExpense(expense)),
  editExpense: (expensesAtt) => dispatch(actionEditExpense(expensesAtt)),
  desactiveEditor: (id) => dispatch(actionActiveEditor(id)),
});

WalletForm.propTypes = {
  currencies: PropTypes.instanceOf(Array).isRequired,
  fetchCoins: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  desactiveEditor: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
