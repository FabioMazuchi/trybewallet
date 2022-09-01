import React, { Component } from "react";
import { connect } from "react-redux";
// import PropTypes from "prop-types";
import { fetchMoedas, editaDespesaSuccess } from "../actions";

const INITIAL_STATE = {
  id: 0,
  value: "0",
  description: "",
  currency: "USD",
  method: "Dinheiro",
  tag: "Alimentação",
  exchangeRates: {},
};

class FormEdit extends Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
    this.handleChange = this.handleChange.bind(this);
    this.setModasEstado = this.setModasEstado.bind(this);
    this.concluirEdiçao = this.concluirEdiçao.bind(this);
  }

  componentDidMount() {
    this.setModasEstado();
    this.getDespesa();
  }

  setModasEstado() {
    const { buscaMoedas } = this.props;
    buscaMoedas();
    const { exchangeRates } = this.props;
    this.setState({ exchangeRates });
  }

  getDespesa() {
    const {
      despesa: { value, description, currency, method, tag, id },
    } = this.props;
    this.setState({ value, description, currency, method, tag, id });
  }

  concluirEdiçao() {
    const {despesas, concluirEdicao, buscaMoedas} = this.props;
    const { id } = this.state;
    despesas.splice(id, 1, this.state);
    concluirEdicao(despesas);
    buscaMoedas();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { exchangeRates } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form className="wallet edit">
        <label htmlFor="value">
          Valor
          <input
            onChange={this.handleChange}
            name="value"
            data-testid="value-input"
            type="text"
            id="value"
            value={value}
          />
        </label>
        <label className="descricao" htmlFor="description">
          Descrição
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
          Moeda
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
        <label className="pagamento" htmlFor="method">
          Método De Pagamento
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
          Tag
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
        <label>
          <button className="editBtn" type="reset" onClick={ this.concluirEdiçao }>
            Concluir Edição
          </button>
        </label>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  buscaMoedas: () => dispatch(fetchMoedas()),
  concluirEdicao: (despesaEditada) => dispatch(editaDespesaSuccess(despesaEditada)),
});

const mapStateToProps = (state) => ({
  exchangeRates: state.wallet.exchangeRates,
  despesa: state.wallet.expense,
  despesas: state.wallet.expenses,
});

// FormEdit.propTypes = {
//   buscaMoedas: PropTypes.func.isRequired,
//   addDespesas: PropTypes.func.isRequired,
//   exchangeRates: PropTypes.objectOf.isRequired,
//   despesas: PropTypes.arrayOf.isRequired,
// };

export default connect(mapStateToProps, mapDispatchToProps)(FormEdit);
