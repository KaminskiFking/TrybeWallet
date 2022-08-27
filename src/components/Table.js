import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  currencyInfos = (param, paramtwo) => {
    console.log(paramtwo);
    const currencyValue = param.map((element) => element.currency);
    console.log(currencyValue[0]);
    const expensesKeys = param.map((element) => Object.values(element.exchangeRates));
    console.log(expensesKeys);
    if (expensesKeys.length >= 1) {
      const testValue = expensesKeys[0]
        .find((element) => element.code === paramtwo);
      console.log(testValue);
      return ({
        nameCoin: testValue.name,
        askValue: testValue.ask,
      });
    }
  };

  render() {
    const { expensesTable } = this.props;
    const result = expensesTable.map((element) => this
      .currencyInfos(expensesTable, element.currency));
    console.log(result);
    return (
      <div>
        Table
        <table>
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
          <tbody>
            {expensesTable.map((element, index) => (
              <tr key={ index }>
                <td>{element.description}</td>
                <td>{element.tag}</td>
                <td>{element.method}</td>
                <td>{`${element.value}.00`}</td>
                <td>{result[index].nameCoin}</td>
                <td>{Number(result[index].askValue).toFixed(2)}</td>
                <td>{(element.value * result[index].askValue).toFixed(2)}</td>
                <td>Real</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expensesTable: state.wallet.expenses,
});

Table.propTypes = {
  expensesTable: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Table);
