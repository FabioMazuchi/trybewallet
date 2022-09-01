import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeDespesa, editaDespesaInit } from "../actions";
import trash from "../images/trash.png";
import edit from "../images/edit.png";

class Table extends Component {
  convertNumber(numero) {
    const n = Number(numero);
    return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  render() {
    const { despesas, deleteItem, editarDespesa } = this.props;
    // {isLoading && 'Loading'}
    return (
      <div className="table">
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
            <th>Editar/Excluir</th>
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
                <div>
                  <button
                    type="button"
                    onClick={() => editarDespesa(despesa)}
                    data-testid="edit-btn"
                  >
                    <img src={edit} alt="Editar" />
                  </button>
                  <button
                    onClick={() => deleteItem(despesa.id)}
                    type="button"
                    data-testid="delete-btn"
                  >
                    <img src={trash} alt="Deletar" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  despesas: state.wallet.expenses,
  isLoading: state.wallet.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  deleteItem: (id) => dispatch(removeDespesa(id)),
  editarDespesa: (despesa) => dispatch(editaDespesaInit(despesa)),
});

Table.propTypes = {
  despesas: PropTypes.arrayOf.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
