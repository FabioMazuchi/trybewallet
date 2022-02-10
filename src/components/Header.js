import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  componentDidMount() {
    this.soma();
  }

  soma() {
    const { despesas } = this.props;
    let total = 0;
    despesas.forEach((despesa) => {
      const moedaSelect = despesa.moeda;
      const valor = Number(despesa.valor);
      const askValue = despesa.exchangeRates[moedaSelect].ask;
      total += valor * askValue;
    });
    return total.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <span data-testid="email-field">{email}</span>
        <span data-testid="total-field">{this.soma()}</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  despesas: state.wallet.expenses,
  isLoading: state.wallet.isFetching,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  despesas: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Header);
