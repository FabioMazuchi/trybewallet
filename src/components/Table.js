import React, { Component } from "react";
import { connect } from "react-redux";

class Table extends Component {

  convertNumber(numero) {
    const n = Number(numero).toFixed(2);
    const n1 = n.toString();
    console.log(typeof(n));
    return n1;
  }

  render() {
    const { despesas, isLoading } = this.props;
    // if (isLoading) return "Loading";
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
          <th>Editar/Excluir</th>
        </tr>
        {despesas.map((despesa) => (
          <tr key={despesa.id}>
            <td>{despesa.description}</td>
            <td>{despesa.tag}</td>
            <td>{despesa.method}</td>
            <td>{this.convertNumber(despesa.value)}</td>
            <td>{despesa.exchangeRates[despesa.currency].name}</td>
            <td>{Number(despesa.exchangeRates[despesa.currency].ask).toFixed(2)}</td>
            <td>
              {(
                despesa.exchangeRates[despesa.currency].ask * despesa.value
              ).toFixed(2)}
            </td>
            <td>Real</td>
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

// Table.propTypes = {
//   despesas: PropTypes.arrayOf.isRequired,
// };

export default connect(mapStateToProps)(Table);
