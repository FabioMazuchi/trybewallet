import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeDespesa } from "../actions";
import trash from "../images/trash.png";

class Table extends Component {
  convertNumber(numero) {
    const n = Number(numero);
    // const n1 = n.toString();
    return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  render() {
    const { despesas, deleteItem } = this.props;
    return (
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
          <th>Excluir</th>
        </tr>
        {despesas.map((despesa) => (
          <tr key={despesa.id}>
            <td>{despesa.description}</td>
            <td>{despesa.tag}</td>
            <td>{despesa.method}</td>
            <td>{this.convertNumber(despesa.value)}</td>
            <td>{despesa.exchangeRates[despesa.currency].name}</td>
            <td>
              {Number(despesa.exchangeRates[despesa.currency].ask).toFixed(2)}
            </td>
            <td>
              {this.convertNumber(
                despesa.exchangeRates[despesa.currency].ask * despesa.value
              )}
            </td>
            <td>Real</td>
            <td>
              <button
                onClick={ () => deleteItem(despesa.id) }
                type="button"
                data-testid="delete-btn"
              >
                <img src={ trash } alt="Deletar" />
              </button>
            </td>
          </tr>
        ))}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  despesas: state.wallet.expenses,
  isLoading: state.wallet.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  deleteItem: (id) => dispatch(removeDespesa(id)),
});

Table.propTypes = {
  despesas: PropTypes.arrayOf.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
