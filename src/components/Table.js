import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, decreaseTotal, edit } from '../redux/actions';

class Table extends Component {
  currencyInfos = (param, paramtwo) => {
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
    const { expensesTable,
      deleteExpenseClick, decreaseTotalClick, editClick } = this.props;
    const result = expensesTable.map((element) => this
      .currencyInfos(expensesTable, element.currency));
    console.log(result);
    console.log(expensesTable);
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
              <tr key={ element.id }>
                <td>{element.description}</td>
                <td>{element.tag}</td>
                <td>{element.method}</td>
                <td>{`${element.value}.00`}</td>
                <td>{result[index].nameCoin}</td>
                <td>{Number(result[index].askValue).toFixed(2)}</td>
                <td>{(element.value * result[index].askValue).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => editClick(element.id) && decreaseTotalClick((
                      element.value * result[index].askValue).toFixed(2)) }
                  >
                    Editar despesa
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => deleteExpenseClick(element.id)
                      && decreaseTotalClick((
                        element.value * result[index].askValue).toFixed(2)) }
                  >
                    Excluir
                  </button>
                </td>
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
  deleteExpenseClick: PropTypes.func.isRequired,
  decreaseTotalClick: PropTypes.func.isRequired,
  editClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deleteExpenseClick: (id) => dispatch(deleteExpense(id)),
  decreaseTotalClick: (value) => dispatch(decreaseTotal(value)),
  editClick: (value) => dispatch(edit(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
