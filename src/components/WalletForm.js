import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi } from '../redux/actions';

class WalletForm extends Component {
  state = {
    despesa: '',
    descDespesa: '',
    currency: 'USD',
    payMethod: 'Dinheiro',
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

  render() {
    const { descDespesa, despesa, currency, payMethod, tag } = this.state;
    const { currencies } = this.props;
    console.log(currencies);
    return (
      <div>
        <input
          type="number"
          data-testid="value-input"
          value={ despesa }
          name="despesa"
          onChange={ (e) => this.handleChange(e) }
        />

        <input
          type="text"
          data-testid="description-input"
          value={ descDespesa }
          name="descDespesa"
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
          value={ payMethod }
          name="payMethod"
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
      </div>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCoins: () => dispatch(fetchApi()),
});

WalletForm.propTypes = {
  currencies: PropTypes.instanceOf(Array).isRequired,
  fetchCoins: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
