import React, { Component } from "react";
import { connect } from "react-redux";
// import PropTypes from "prop-types";
import { addDespesa, fetchMoedas } from "../actions";

class FormWallet extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: "",
      currency: "USD",
      method: "Dinheiro",
      tag: "Alimentação",
    };
    this.handleChange = this.handleChange.bind(this);
    this.adicionarDespesa = this.adicionarDespesa.bind(this);
  }

  componentDidMount() {
    const { buscaMoedas } = this.props;
    buscaMoedas();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  adicionarDespesa() {
    // e.preventDefault();
    const { addDespesas, despesas, buscaMoedas, exchangeRates } = this.props;
    buscaMoedas();
    this.setState(
      {
        id: despesas.length,
        exchangeRates,
      },
      () => {
        addDespesas(this.state);
        this.setState({ value: 0 });
      },
    );
  }

  render() {
    const { exchangeRates, isLoading } = this.props;
    const { value, description, currency, method, tag } = this.state;
    // if (isLoading) return 'loading';
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            onChange={this.handleChange}
            name="value"
            data-testid="value-input"
            type="number"
            id="value"
            value={value}
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            onChange={this.handleChange}
            name="description"
            data-testid="description-input"
            type="text"
            id="description"
            value={description}
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            onChange={this.handleChange}
            name="currency"
            id="currency"
            data-testid="currency-input"
            value={currency}
          >
            {exchangeRates !== undefined &&
              Object.keys(exchangeRates)
                .filter((rate) => rate !== "USDT")
                .map((moeda) => (
                  <option data-testid={moeda} key={moeda}>
                    {moeda}
                  </option>
                ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            onChange={this.handleChange}
            name="method"
            id="method"
            data-testid="method-input"
            value={method}
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
            value={tag}
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
  addDespesas: (despesa) => dispatch(addDespesa(despesa)),
  buscaMoedas: () => dispatch(fetchMoedas()),
});

const mapStateToProps = (state) => ({
  despesas: state.wallet.expenses,
  exchangeRates: state.wallet.exchangeRates,
  isLoading: state.wallet.isFetching,
});

// FormWallet.propTypes = {
//   buscaMoedas: PropTypes.func.isRequired,
//   addDespesas: PropTypes.func.isRequired,
//   exchangeRates: PropTypes.objectOf.isRequired,
//   isLoading: PropTypes.bool.isRequired,
//   despesas: PropTypes.arrayOf.isRequired,
// };

export default connect(mapStateToProps, mapDispatchToProps)(FormWallet);
