import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addDespesa, fetchMoedas } from '../actions';

const INITIAL_STATE = {
  id: 0,
  value: '0',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class FormWallet extends Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
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
    const { addDespesas, despesas, buscaMoedas, exchangeRates } = this.props;
    buscaMoedas();
    this.setState(
      {
        id: despesas.length,
        exchangeRates,
      },
      () => {
        addDespesas(this.state);
        this.setState(INITIAL_STATE);
      },
    );
  }

  render() {
    const { exchangeRates } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form className="wallet">
        <label className='valor' htmlFor="value">
          Valor
          <input
            onChange={ this.handleChange }
            name="value"
            data-testid="value-input"
            type="text"
            id="value"
            value={ value }
          />
        </label>
        <label className='descricao' htmlFor="description">
          Descrição
          <input
            onChange={ this.handleChange }
            name="description"
            data-testid="description-input"
            type="text"
            id="description"
            value={ description }
          />
        </label>
        <label htmlFor="currency">
          Moeda
          <select
            onChange={ this.handleChange }
            name="currency"
            id="currency"
            data-testid="currency-input"
            value={ currency }
          >
            {exchangeRates !== undefined
              && Object.keys(exchangeRates)
                .filter((rate) => rate !== 'USDT')
                .map((moeda) => (
                  <option data-testid={ moeda } key={ moeda }>
                    {moeda}
                  </option>
                ))}
          </select>
        </label>
        <label className='pagamento' htmlFor="method">
          Método De Pagamento
          <select
            onChange={ this.handleChange }
            name="method"
            id="method"
            data-testid="method-input"
            value={ method }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag
          <select
            onChange={ this.handleChange }
            name="tag"
            id="tag"
            data-testid="tag-input"
            value={ tag }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <label for="">
          <button onClick={ this.adicionarDespesa } type="reset">
            Adicionar Despesa
          </button>
        </label>
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
  editando: state.wallet.isEditing,
  despesa: state.wallet.expense,
});

FormWallet.propTypes = {
  buscaMoedas: PropTypes.func.isRequired,
  addDespesas: PropTypes.func.isRequired,
  exchangeRates: PropTypes.objectOf.isRequired,
  despesas: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormWallet);
