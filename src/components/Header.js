import React, { Component } from "react";
import { connect } from "react-redux";

class Header extends Component {
  constructor() {
    super();
  }

  soma() {
    const { despesas } = this.props;
    let total = 0;
    despesas.forEach((despesa) => {
      const moedaSelect = despesa.moeda;
      const valor = Number(despesa.valor);
      if (valor === 0) {
        total = total;
      } else {
        console.log(typeof valor);
        const ask = despesa.exchangeRates[moedaSelect].ask;
        total += valor * ask;
        console.log('valor:'+valor);
        console.log(ask);
        console.log(total);
      }
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
  isLoading: state.wallet.isLoading,
});

export default connect(mapStateToProps)(Header);
