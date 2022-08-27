import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenses, sumAsk, editForm } from '../redux/actions';

const paymentMethods = ['Dinheiro', 'Cartão de débito', 'Cartão de crédito'];
const category = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

const obj = {
  id: 0,
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: category[0],
};

class WalletForm extends Component {
  constructor(props) {
    super(props);
    this.state = obj;
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { id, value, description, currency, method, tag } = this.state;
    const { expensesAdd, sumAskForm } = this.props;
    const requestAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const exchangeRates = await requestAPI.json();
    const index = Object.keys(exchangeRates).indexOf(currency);
    const askIndex = Object.values(exchangeRates)[index].ask;
    const priceUpdate = parseFloat(value) * parseFloat(askIndex);
    sumAskForm(priceUpdate);
    const stateUpdate = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    expensesAdd(stateUpdate);
    this.setState({
      id: id + 1,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: category[0],
    });
    const formReset = document.getElementById('form');
    formReset.reset();
  };

  handleClickEdit = async (event) => {
    event.preventDefault();
    const { value, description, currency, method, tag } = this.state;
    const { editValueForm, sumAskForm, idButton } = this.props;
    const requestAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const exchangeRates = await requestAPI.json();
    const index = Object.keys(exchangeRates).indexOf(currency);
    const askIndex = Object.values(exchangeRates)[index].ask;
    const priceUpdate = parseFloat(value) * parseFloat(askIndex);
    sumAskForm(priceUpdate);
    const stateUpdate = {
      id: idButton,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    editValueForm(stateUpdate);
    const formReset = document.getElementById('form');
    formReset.reset();
  };

  render() {
    const { moedas, editButton } = this.props;
    const moedasKeys = moedas;
    return (
      <div>
        <form id="form">
          <label htmlFor="value">
            Valor Despesa:
            <input
              data-testid="value-input"
              type="number"
              name="value"
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              data-testid="description-input"
              type="text"
              name="description"
              onChange={ this.onInputChange }
            />
          </label>
          <select
            onChange={ this.onInputChange }
            data-testid="currency-input"
            name="currency"
          >
            {moedasKeys && moedasKeys.map((valuesMoedas, index) => (
              <option
                key={ index }
              >
                { valuesMoedas }
              </option>
            ))}
          </select>
          <select
            onChange={ this.onInputChange }
            data-testid="method-input"
            name="method"
          >
            {paymentMethods.map((valuesPayment, index) => (
              <option
                key={ index }
              >
                { valuesPayment }
              </option>
            ))}
          </select>
          <select
            onChange={ this.onInputChange }
            data-testid="tag-input"
            name="tag"
          >
            {category.map((valuesCategory, index) => (
              <option
                key={ index }
              >
                { valuesCategory }
              </option>
            ))}
          </select>
          {!editButton && (
            <button
              type="submit"
              onClick={ this.handleClick }
            >
              Adicionar despesa
            </button>)}
          {editButton && (
            <button
              type="submit"
              onClick={ this.handleClickEdit }
            >
              Editar Despesas
            </button>
          )}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  moedas: state.wallet.currencies,
  editButton: state.wallet.editState,
  idButton: state.wallet.idExpense,
});

const mapDispatchToProps = (dispatch) => ({
  expensesAdd: (...payload) => dispatch(addExpenses(payload)),
  sumAskForm: (value) => dispatch(sumAsk(value)),
  editValueForm: (value) => dispatch(editForm(value)),
});

WalletForm.propTypes = {
  moedas: PropTypes.string.isRequired,
  expensesAdd: PropTypes.func.isRequired,
  sumAskForm: PropTypes.func.isRequired,
  idButton: PropTypes.func.isRequired,
  editValueForm: PropTypes.func.isRequired,
  editButton: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
