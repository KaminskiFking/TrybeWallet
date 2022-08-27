import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WalletForm from '../components/WalletForm';
import { fetchAPI } from '../redux/actions';
import Table from '../components/Table';

class Wallet extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPI()); // enviando a action fetchAPI
  }

  render() {
    const { email, total } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">{ total }</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <WalletForm />
        <Table />
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

export default connect(mapStateToProps)(Wallet);
