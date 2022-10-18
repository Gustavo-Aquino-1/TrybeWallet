import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FiEdit } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';
import styled from 'styled-components';
import { actionRemoveExpense, actionActiveEditor } from '../redux/actions';

const TableArea = styled.table`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 90%;
  margin: auto;
  /* th {
    color: rgba(36, 64, 65, 0.76);
  }
  table, th, td {
  border: 1px solid rgba(36, 64, 65, 0.76);
  text-align: center;
} */

  table, th, td {
    padding: 20px 50px;
    border: 1px solid white;
    border-collapse: collapse;
  }
  th{
    background-color: royalblue;
    color: white;
  }

  td {
    background-color:white;
    border-bottom: 1px solid rgba(66, 69, 72, 0.38);
  }

  td {
    button {
      margin-bottom: 10px;
      text-align: center;
      height: 24px;
      &:hover {
        cursor: pointer;
      }
      &:nth-child(1) {
        background-color: rgba(36, 64, 65, 0.76);
        margin-left: 10px;
        margin-right: 20px;
        color: royalblue;
        border: none;
        font-size: 24px;
        background-color: white;
      }
      &:nth-child(2) {
        font-size: 23px;
        background-color: white;
        color: red;
        border: none;
      }
    }
  }
`;

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
      <TableArea>

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
              expenses.map((e) => (
                <tr key={ e.id }>
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
                      <FiEdit />
                    </button>

                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => removeExpense(e.id) }
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </TableArea>
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
