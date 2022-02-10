import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addDespesa, fetchMoedas } from '../actions';

class FormWallet extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      valor: 0,
      descricao: '',
      moeda: 'USD',
      pagamento: 'Dinheiro',
      tag: 'Alimentação',
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

  adicionarDespesa(e) {
    e.preventDefault();
    const { addDespesas, despesas, buscaMoedas, exchangeRates } = this.props;
    buscaMoedas();
    this.setState(
      {
        id: despesas.length,
        exchangeRates,
      },
      () => addDespesas(this.state),
    );
  }

  render() {
    const { exchangeRates, isLoading } = this.props;
    const { valor } = this.state;
    console.log(valor);
    return (
      <form>
        {isLoading ? (
          'Carregando'
        ) : (
          <>
            <label htmlFor="valor">
              Valor:
              <input
                onChange={ this.handleChange }
                name="valor"
                data-testid="value-input"
                type="number"
                id="valor"
                value={ valor === 0 ? 0 : valor }
              />
            </label>
            <label htmlFor="descricao">
              Descrição:
              <input
                onChange={ this.handleChange }
                name="descricao"
                data-testid="description-input"
                type="text"
                id="descricao"
              />
            </label>
            <label htmlFor="moeda">
              Moeda:
              <select
                onChange={ this.handleChange }
                name="moeda"
                id="moeda"
                data-testid="currency-input"
              >
                {exchangeRates !== undefined && Object.keys(exchangeRates)
                  .filter((rate) => rate !== 'USDT')
                  .map((moeda) => (
                    <option data-testid={ moeda } key={ moeda }>
                      {moeda}
                    </option>
                  ))}
              </select>
            </label>
            <label htmlFor="pagamento">
              Método de pagamento:
              <select
                onChange={ this.handleChange }
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
                onChange={ this.handleChange }
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
            <button onClick={ (e) => this.adicionarDespesa(e) } type="submit">
              Adicionar despesa
            </button>
          </>
        )}
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

FormWallet.propTypes = {
  buscaMoedas: PropTypes.func.isRequired,
  addDespesas: PropTypes.func.isRequired,
  exchangeRates: PropTypes.objectOf.isRequired,
  isLoading: PropTypes.bool.isRequired,
  despesas: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormWallet);
