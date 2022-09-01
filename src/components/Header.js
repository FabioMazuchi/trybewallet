import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import wallet from '../images/wallet.png';

class Header extends Component {
  soma() {
    const { despesas } = this.props;
    let total = 0;
    despesas.forEach((despesa) => {
      const moedaSelect = despesa.currency;
      const valor = Number(despesa.value);
      const askValue = despesa.exchangeRates[moedaSelect].ask;
      total += valor * askValue;
    });
    return total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    // return total.toFixed(2).toString();
  }

  render() {
    const { email } = this.props;
    // if (isLoading) return 'Loading';
    return (
      <header>
        <h1><img src={wallet} alt="Wallet" /> MyWallet</h1>
        <div>
          <span data-testid="email-field">{email}</span>
          <p data-testid="total-field">
            Total: { this.soma() }
            <span data-testid="header-currency-field"> BRL</span>
          </p>
        </div>
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
