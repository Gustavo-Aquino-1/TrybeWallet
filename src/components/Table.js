import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionRemoveExpense, actionActiveEditor } from '../redux/actions';

class Table extends Component {
  calculaValor = (ask) => {
    const result = Number(ask);
    return Number(result).toFixed(2);
  };

  calculaValor2 = (valor, ask) => {
    const result = Number(ask) * Number(valor);
    return Number(result).toFixed(2);
  };

  handleEditor = (expense) => {
    const idEdit = expense.id;
    const { activeEditor } = this.props;
    activeEditor(idEdit);
  };

  render() {
    const { expenses, removeExpense } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>

        <tbody>
          {
            expenses.map((e, index) => (
              <tr key={ index }>
                <td>{e.description}</td>
                <td>{e.tag}</td>
                <td>{e.method}</td>
                <td>{Number(e.value).toFixed(2)}</td>
                <td>{e.exchangeRates[e.currency].name}</td>
                <td>{this.calculaValor(e.exchangeRates[e.currency].ask)}</td>
                <td>{this.calculaValor2(e.value, e.exchangeRates[e.currency].ask)}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.handleEditor(e) }
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => removeExpense(e.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (expense) => dispatch(actionRemoveExpense(expense)),
  activeEditor: (id) => dispatch(actionActiveEditor(id)),
});

Table.propTypes = {
  expenses: PropTypes.instanceOf(Array).isRequired,
  removeExpense: PropTypes.func.isRequired,
  activeEditor: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
