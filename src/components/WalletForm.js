import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const paymentMethods = ['Dinheiro', 'Cartão de débito', 'Cartão de crédito'];
const category = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class WalletForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: category[0],
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { moedas } = this.props;
    const moedasKeys = moedas;
    const { tag, method, currency, description, value } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="number">
            Valor Despesa:
            <input
              data-testid="value-input"
              type="text"
              name={ value }
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="description">
            Valor Despesa:
            <input
              data-testid="description-input"
              type="text"
              name={ description }
              onChange={ this.onInputChange }
            />
          </label>
          <select data-testid="currency-input">
            {moedasKeys && moedasKeys.map((values, index) => (
              <option
                name={ currency }
                onChange={ this.onInputChange }
                key={ index }
              >
                { values }
              </option>
            ))}
          </select>
          <select data-testid="method-input">
            {paymentMethods.map((values, index) => (
              <option
                name={ method }
                onChange={ this.onInputChange }
                key={ index }
              >
                { values }
              </option>
            ))}
          </select>
          <select data-testid="tag-input">
            {category.map((values, index) => (
              <option
                name={ tag }
                onChange={ this.onInputChange }
                key={ index }
              >
                { values }
              </option>
            ))}
          </select>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  moedas: state.wallet.currencies,
});

WalletForm.propTypes = {
  moedas: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
