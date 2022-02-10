import React, { Component } from "react";
import { connect } from "react-redux";
import { addDespesa } from "../actions";
import { fetchMoedas } from "../actions";

class FormWallet extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      valor: 0,
      descricao: "",
      moeda: "USD",
      pagamento: "Dinheiro",
      tag: "Alimentação",
      exchangeRates: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.adicionarDespesa = this.adicionarDespesa.bind(this);
  }

  componentDidMount() {
    const { exchangeRates, fetchMoedas } = this.props;
    fetchMoedas();
    this.setState({ exchangeRates: exchangeRates });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.exchangeRates !== prevState.exchangeRates) {
      this.setState({ valor: 0 });
    }
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  adicionarDespesa() {
    const { addDespesa, despesas, fetchMoedas, exchangeRates } = this.props;
    fetchMoedas();
    this.setState(
      {
        id: despesas.length,
        exchangeRates: exchangeRates,
      },
      () => addDespesa(this.state),
    );
  }

  render() {
    const { exchangeRates } = this.props;
    return (
      <form>
        <label htmlFor="valor">
          Valor:
          <input
            onChange={this.handleChange}
            name="valor"
            data-testid="value-input"
            type="number"
            id="valor"
          />
        </label>
        <label htmlFor="descricao">
          Descrição:
          <input
            onChange={this.handleChange}
            name="descricao"
            data-testid="description-input"
            type="text"
            id="descricao"
          />
        </label>
        <label htmlFor="moeda">
          Moeda:
          <select
            onChange={this.handleChange}
            name="moeda"
            id="moeda"
            data-testid="currency-input"
          >
            {exchangeRates !== undefined && Object.keys(exchangeRates).filter((rate => rate !== 'USDT')).map((moeda) => (
              <option data-testid={moeda} key={moeda}>{moeda}</option>
            ))}
          </select>
        </label>
        <label htmlFor="pagamento">
          Método de pagamento:
          <select
            onChange={this.handleChange}
            name="pagamento"
            id="pagamento"
            data-testid="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select
            onChange={this.handleChange}
            name="tag"
            id="tag"
            data-testid="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button onClick={this.adicionarDespesa} type="reset">
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addDespesa: (despesa) => dispatch(addDespesa(despesa)),
  fetchMoedas: () => dispatch(fetchMoedas()),
});

const mapStateToProps = (state) => {
  // console.log(state.wallet.expenses);
  return {
    despesas: state.wallet.expenses,
    exchangeRates: state.wallet.exchangeRates,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormWallet);
