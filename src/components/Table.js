import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  calculaValor = (ask) => {
    const result = Number(ask);
    return Number(result).toFixed(2);
  };

  calculaValor2 = (valor, ask) => {
    const result = Number(ask) * Number(valor);
    return Number(result).toFixed(2);
  };

  render() {
    const { expenses } = this.props;
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
          {/* <tr> */}
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
              </tr>
            ))
          }
          {/* </tr> */}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps)(Table);

// this.calculaValor(e.value, e.exchangeRates[e.currency].ask)
